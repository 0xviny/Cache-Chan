using MongoDB.Driver;
using CacheChan.Server.Models;
using Microsoft.Extensions.Options;
using System.Security.Cryptography;
using System.Text;

namespace CacheChan.Server.Services
{
    public interface IUserService
    {
        Task<UserData?> AuthenticateAsync(string email, string password);
        Task<UserData?> RegisterAsync(string username, string email, string password);
        Task<UserData?> GetUserByApiKeyAsync(string apiKey);
        Task<string?> RegenerateApiKeyAsync(string userId);
        Task UpdateUserAsync(UserData user);
    }

    public class UserService : IUserService
    {
        private readonly IMongoCollection<UserData> _users;

        public UserService(IOptions<MongoSettings> mongoSettings)
        {
            var client = new MongoClient(mongoSettings.Value.ConnectionString);
            var database = client.GetDatabase(mongoSettings.Value.Database);
            _users = database.GetCollection<UserData>("Users");
        }

        public async Task<UserData?> RegisterAsync(string name, string email, string password)
        {
            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
                throw new ArgumentException("Email and password cannot be empty.");

            var existing = await _users.Find(u => u.Email == email).FirstOrDefaultAsync();
            if (existing != null)
                return null;

            var user = new UserData
            {
                UserName = name,
                Email = email,
                PasswordHash = ComputeHash(password),
                ApiKey = Guid.NewGuid().ToString(),
                CreatedAt = DateTime.UtcNow,
                Role = "user"
            };

            await _users.InsertOneAsync(user);
            return user;
        }

        public async Task<UserData?> AuthenticateAsync(string email, string password)
        {
            var user = await _users.Find(u => u.Email == email).FirstOrDefaultAsync();
            if (user == null) return null;
            return (ComputeHash(password) == user.PasswordHash) ? user : null;
        }

        public async Task<UserData?> GetUserByApiKeyAsync(string apiKey)
        {
            return await _users.Find(u => u.ApiKey == apiKey).FirstOrDefaultAsync();
        }

        public async Task<string?> RegenerateApiKeyAsync(string userId)
        {
            var newApiKey = Guid.NewGuid().ToString("N");
            var update = Builders<UserData>.Update.Set(u => u.ApiKey, newApiKey);
            var result = await _users.UpdateOneAsync(u => u.Id == userId, update);
            return result.ModifiedCount > 0 ? newApiKey : null;
        }

        public async Task UpdateUserAsync(UserData user)
        {
            var filter = Builders<UserData>.Filter.Eq(u => u.Id, user.Id);
            await _users.ReplaceOneAsync(filter, user);
        }

        private string ComputeHash(string input)
        {
            using var sha256 = SHA256.Create();
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(input));
            var sb = new StringBuilder();
            foreach (var b in bytes)
                sb.Append(b.ToString("x2"));
            return sb.ToString();
        }

        public static string ComputeHashStatic(string input)
        {
            using var sha256 = SHA256.Create();
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(input));
            var sb = new StringBuilder();
            foreach (var b in bytes)
                sb.Append(b.ToString("x2"));
            return sb.ToString();
        }
    }
}
