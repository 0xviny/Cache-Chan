using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using CacheChan.Core;
using CacheChan.Core.Interfaces;
using CacheChan.Core.Services;
using CacheChan.Server.Models;
using CacheChan.Server.Services;
using CacheChan.Server.DTOs;
using System;
using System.Linq;
using System.Threading.Tasks;
using CacheChan.Core.Models;

DotNetEnv.Env.Load();

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseKestrel(options =>
{
    options.ListenAnyIP(80);
});

builder.Services.Configure<MongoSettings>(options =>
{
    options.ConnectionString = Environment.GetEnvironmentVariable("MONGODB_URI");
    options.Database = "CacheChanDb";
});

builder.Services.AddSingleton<SupportService>();
builder.Services.AddSingleton<IUserService, UserService>();
builder.Services.AddSingleton<UserDataService>();
builder.Services.AddSingleton<TenantCacheService>();

builder.Services.AddSingleton<IMetricsService, MetricsService>();
builder.Services.AddSingleton<ILoggerService, LoggerService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseCors("AllowAll");

app.MapPost("/register", async (RegisterRequest reg, IUserService userService) =>
{
    try
    {
        var user = await userService.RegisterAsync(reg.Username, reg.Email, reg.Password);
        if (user == null)
            return Results.BadRequest(new { success = false, error = "Já existe uma conta com este e-mail." });

        return Results.Ok(new
        {
            success = true,
            apiKey = user.ApiKey,
            user = new
            {
                id = user.Id,
                name = user.UserName,
                email = user.Email,
                role = user.Role
            }
        });
    }
    catch (ArgumentException ex)
    {
        return Results.BadRequest(new { success = false, error = ex.Message });
    }
    catch (Exception)
    {
        return Results.Problem("Erro interno ao criar conta.");
    }
});

app.MapPost("/login", async (LoginRequest login, IUserService userService) =>
{
    var user = await userService.AuthenticateAsync(login.Email, login.Password);
    if (user == null)
    {
        return Results.BadRequest(new { success = false, error = "E-mail ou senha incorretos." });
    }
    return Results.Ok(new
    {
        success = true,
        apiKey = user.ApiKey,
        token = "dummy-jwt-token",
        user = new { id = user.Id, name = user.UserName, email = user.Email, role = user.Role }
    });
});

app.Use(async (context, next) =>
{
    if (context.Request.Path.StartsWithSegments("/login") ||
        context.Request.Path.StartsWithSegments("/register") ||
        context.Request.Path.StartsWithSegments("/status"))
    {
        await next();
        return;
    }

    if (!context.Request.Headers.TryGetValue("x-api-key", out var apiKey))
    {
        context.Response.StatusCode = 401;
        await context.Response.WriteAsJsonAsync(new { success = false, error = "API Key is missing." });
        return;
    }

    var userService = context.RequestServices.GetRequiredService<IUserService>();
    var user = await userService.GetUserByApiKeyAsync(apiKey!);
    if (user == null)
    {
        context.Response.StatusCode = 403;
        await context.Response.WriteAsJsonAsync(new { success = false, error = "Invalid API Key." });
        return;
    }

    context.Items["User"] = user;
    await next();
});

app.Use(async (context, next) =>
{
    await next();
    if (context.Items["User"] is UserData user)
    {
        var metricsService = context.RequestServices.GetRequiredService<IMetricsService>();
        try
        {
            var metric = new CacheChan.Core.Models.Metrics
            {
                Timestamp = DateTime.UtcNow,
                Name = "HTTPRequest",
                Value = 1,
                Category = "HTTP"
            };

            await metricsService.SaveMetricAsync(user.ApiKey, metric);
        }
        catch (Exception ex)
        {
            var logger = context.RequestServices.GetRequiredService<CacheChan.Core.Interfaces.ILoggerService>();
            logger.LogError("Erro ao registrar métrica de requisição.", ex);
        }
    }
});

app.MapGet("/users/me", async (HttpContext context, IUserService userService) =>
{
    if (context.Items["User"] is not UserData user)
        return Results.Unauthorized();

    var updatedUser = await userService.GetUserByApiKeyAsync(user.ApiKey);
    return Results.Ok(new
    {
        success = true,
        user = new
        {
            id = updatedUser?.Id,
            name = updatedUser?.UserName,
            email = updatedUser?.Email,
            role = updatedUser?.Role
        }
    });
});

app.MapPut("/users/me", async (HttpContext context, IUserService userService, UpdateProfileDto dto) =>
{
    if (context.Items["User"] is not UserData user)
        return Results.Unauthorized();

    user.UserName = dto.Name;
    user.Email = dto.Email;
    await userService.UpdateUserAsync(user);
    return Results.Ok(new { success = true, user = new { id = user.Id, name = user.UserName, email = user.Email, role = user.Role } });
});

app.MapPost("/users/me/password", async (HttpContext context, IUserService userService, ChangePasswordDto dto) =>
{
    if (context.Items["User"] is not UserData user)
        return Results.Unauthorized();

    if (user.PasswordHash != UserService.ComputeHashStatic(dto.CurrentPassword))
        return Results.BadRequest(new { success = false, error = "Senha atual incorreta." });

    user.PasswordHash = UserService.ComputeHashStatic(dto.NewPassword);
    await userService.UpdateUserAsync(user);
    return Results.Ok(new { success = true });
});

app.MapGet("/cache/{key}", (string key, HttpContext context, TenantCacheService tenantCacheService) =>
{
    if (context.Items["User"] is not UserData user)
        return Results.Unauthorized();

    var tenant = tenantCacheService.GetTenant(user.ApiKey);
    var value = tenant.MemoryCache.Get(key);

    if (value != null)
    {
        var metricsService = context.RequestServices.GetRequiredService<IMetricsService>();
        _ = metricsService.SaveMetricAsync(user.ApiKey, new CacheChan.Core.Models.Metrics
        {
            Timestamp = DateTime.UtcNow,
            Name = "CacheHit",
            Value = 1,
            Category = "Cache"
        });
        return Results.Ok(new { success = true, data = value });
    }
    else
    {
        var metricsService = context.RequestServices.GetRequiredService<IMetricsService>();
        _ = metricsService.SaveMetricAsync(user.ApiKey, new CacheChan.Core.Models.Metrics
        {
            Timestamp = DateTime.UtcNow,
            Name = "CacheMiss",
            Value = 1,
            Category = "Cache"
        });
        return Results.NotFound(new { success = false, error = "Key not found." });
    }
});

app.MapPost("/cache", (CacheRequest req, HttpContext context, TenantCacheService tenantCacheService) =>
{
    if (context.Items["User"] is not UserData user)
        return Results.Unauthorized();

    var tenant = tenantCacheService.GetTenant(user.ApiKey);
    tenant.MemoryCache.Set(req.Key, req.Value, req.TTL);

    var metricsService = context.RequestServices.GetRequiredService<IMetricsService>();
    _ = metricsService.SaveMetricAsync(user.ApiKey, new CacheChan.Core.Models.Metrics
    {
        Timestamp = DateTime.UtcNow,
        Name = "CacheSet",
        Value = 1,
        Category = "Cache"
    });
    return Results.Ok(new { success = true });
});

app.MapDelete("/cache/{key}", (string key, HttpContext context, TenantCacheService tenantCacheService) =>
{
    if (context.Items["User"] is not UserData user)
        return Results.Unauthorized();

    var tenant = tenantCacheService.GetTenant(user.ApiKey);
    tenant.MemoryCache.Remove(key);

    var metricsService = context.RequestServices.GetRequiredService<IMetricsService>();
    _ = metricsService.SaveMetricAsync(user.ApiKey, new CacheChan.Core.Models.Metrics
    {
        Timestamp = DateTime.UtcNow,
        Name = "CacheRemove",
        Value = 1,
        Category = "Cache"
    });
    return Results.Ok(new { success = true });
});

app.MapGet("/cache", (HttpContext context, TenantCacheService tenantCacheService) =>
{
    if (context.Items["User"] is not UserData user)
        return Results.Unauthorized();

    var tenant = tenantCacheService.GetTenant(user.ApiKey);
    var items = tenant.MemoryCache.List();
    return Results.Ok(new { success = true, data = items });
});

app.MapPost("/metrics", async (HttpContext context) =>
{
    try
    {
        var metrics = await context.Request.ReadFromJsonAsync<List<Metrics>>();

        if (metrics == null || metrics.Count == 0)
        {
            return Results.BadRequest(new { success = false, error = "Nenhuma métrica informada." });
        }

        var mongoSettings = context.RequestServices.GetRequiredService<IOptions<MongoSettings>>().Value;
        var client = new MongoClient(mongoSettings.ConnectionString);
        var database = client.GetDatabase(mongoSettings.Database);
        var collection = database.GetCollection<Metrics>("Metrics");

        await collection.InsertManyAsync(metrics);

        return Results.Ok(new { success = true, count = metrics.Count });
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Erro ao receber métricas: {ex.Message}");
        return Results.Problem("Erro ao processar as métricas.");
    }
});

app.MapGet("/metrics", (HttpContext context, TenantCacheService tenantCacheService) =>
{
    if (context.Items["User"] is not UserData user)
        return Results.Unauthorized();

    var tenant = tenantCacheService.GetTenant(user.ApiKey);
    return Results.Ok(new
    {
        success = true,
        data = new
        {
            totalRequests = tenant.Metrics.TotalRequests,
            hits = tenant.Metrics.HitCount,
            misses = tenant.Metrics.MissCount,
            evictions = tenant.Metrics.EvictionCount,
            hitRate = tenant.Metrics.HitRate
        }
    });
});

app.MapGet("/users/api-keys", (HttpContext context) =>
{
    if (context.Items["User"] is not UserData user)
        return Results.Unauthorized();

    return Results.Ok(new
    {
        success = true,
        data = new[] {
            new { id = user.Id, key = user.ApiKey, active = true }
        }
    });
});

app.MapPost("/users/regenerate-api-key", async (HttpContext context, IUserService userService) =>
{
    if (context.Items["User"] is not UserData user)
        return Results.Unauthorized();

    var newApiKey = await userService.RegenerateApiKeyAsync(user.Id);
    return Results.Ok(new { success = true, apiKey = newApiKey });
});

app.MapGet("/support/threads", async (HttpContext context, SupportService supportService) =>
{
    if (context.Items["User"] is not UserData user)
        return Results.Unauthorized();

    var threads = context.Request.Query.ContainsKey("all") && user.Role == "admin"
        ? await supportService.GetAllThreadsAsync()
        : await supportService.GetUserThreadsAsync(user.Id);

    return Results.Ok(new
    {
        success = true,
        data = threads.Select(t => new
        {
            id = t.Id,
            subject = t.Subject,
            status = t.Status,
            lastMessageTimestamp = t.LastMessageTimestamp.ToString("o"),
            unreadCount = t.UnreadCount,
            userName = t.UserName
        })
    });
});

app.MapPost("/support/threads", async (CreateThreadRequest req, HttpContext context, SupportService supportService, IUserService userService) =>
{
    if (context.Items["User"] is not UserData user)
        return Results.Unauthorized();

    var fullUser = await userService.GetUserByApiKeyAsync(user.ApiKey);
    if (fullUser == null) return Results.Unauthorized();

    var thread = new SupportThread
    {
        Id = MongoDB.Bson.ObjectId.GenerateNewId().ToString(),
        UserId = fullUser.Id,
        UserName = user.UserName,
        UserEmail = user.Email,
        Subject = req.Subject,
        Status = "open",
        LastMessageTimestamp = DateTime.UtcNow,
        Messages = new List<SupportMessage>
        {
            new SupportMessage
            {
                Id = MongoDB.Bson.ObjectId.GenerateNewId().ToString(),
                ThreadId = "",
                UserId = fullUser.Id,
                UserName = user.UserName,
                UserEmail = user.Email,
                IsAdmin = false,
                Message = req.Message,
                Timestamp = DateTime.UtcNow
            }
        }
    };

    thread.Messages[0].ThreadId = thread.Id;
    await supportService.CreateThreadAsync(thread);

    return Results.Ok(new
    {
        success = true,
        data = new
        {
            id = thread.Id,
            subject = thread.Subject,
            status = thread.Status,
            lastMessageTimestamp = thread.LastMessageTimestamp.ToString("o"),
            unreadCount = thread.UnreadCount,
            userName = thread.UserName
        }
    });
});

app.MapGet("/support/threads/{id}", async (string id, HttpContext context, SupportService supportService) =>
{
    if (context.Items["User"] is not UserData user)
        return Results.Unauthorized();

    var thread = await supportService.GetThreadByIdAsync(id);
    if (thread == null)
        return Results.NotFound(new { success = false, error = "Thread not found." });

    return Results.Ok(new
    {
        success = true,
        data = new
        {
            id = thread.Id,
            subject = thread.Subject,
            status = thread.Status,
            lastMessageTimestamp = thread.LastMessageTimestamp.ToString("o"),
            unreadCount = thread.UnreadCount,
            userName = thread.UserName,
            messages = thread.Messages.Select(m => new
            {
                id = m.Id,
                message = m.Message,
                timestamp = m.Timestamp.ToString("o"),
                isAdmin = m.IsAdmin,
                userName = m.UserName
            })
        }
    });
});

app.MapPost("/support/threads/{id}/messages", async (string id, SendMessageRequest req, HttpContext context, SupportService supportService) =>
{
    if (context.Items["User"] is not UserData user)
        return Results.Unauthorized();

    var message = new SupportMessage
    {
        Id = MongoDB.Bson.ObjectId.GenerateNewId().ToString(),
        ThreadId = id,
        UserId = user.Id,
        UserName = user.UserName,
        UserEmail = user.Email,
        IsAdmin = user.Role == "admin",
        Message = req.Message,
        Timestamp = DateTime.UtcNow
    };

    await supportService.AddMessageToThreadAsync(id, message);

    return Results.Ok(new
    {
        success = true,
        data = new
        {
            id = message.Id,
            message = message.Message,
            timestamp = message.Timestamp.ToString("o"),
            isAdmin = message.IsAdmin,
            userName = message.UserName
        }
    });
});

app.MapPost("/support/threads/{id}/read", async (string id, HttpContext context, SupportService supportService) =>
{
    if (context.Items["User"] is not UserData user)
        return Results.Unauthorized();

    await supportService.MarkThreadAsReadAsync(id);
    return Results.Ok(new { success = true });
});

app.MapPost("/support/threads/{id}/close", async (string id, HttpContext context, SupportService supportService) =>
{
    if (context.Items["User"] is not UserData user)
        return Results.Unauthorized();

    await supportService.CloseThreadAsync(id);
    return Results.Ok(new { success = true });
});

app.MapPost("/support/threads/{id}/reopen", async (string id, HttpContext context, SupportService supportService) =>
{
    if (context.Items["User"] is not UserData user)
        return Results.Unauthorized();

    await supportService.ReopenThreadAsync(id);
    return Results.Ok(new { success = true });
});

app.MapGet("/status", () => Results.Ok(new { success = true, status = "ok" }));

app.Run();

record CacheRequest(string Key, string Value, TimeSpan? TTL);
record LoginRequest(string Email, string Password);
record RegisterRequest(string Username, string Email, string Password);
record UpdateProfileDto(string Name, string Email);
record ChangePasswordDto(string CurrentPassword, string NewPassword);