using Microsoft.Extensions.Options;
using MongoDB.Driver;
using CacheChan.Server.Models;

namespace CacheChan.Server.Services;

public class SupportService
{
    private readonly IMongoCollection<SupportThread> _threadsCollection;

    public SupportService(IOptions<MongoSettings> mongoSettings)
    {
        var client = new MongoClient(mongoSettings.Value.ConnectionString);
        var database = client.GetDatabase(mongoSettings.Value.Database);
        _threadsCollection = database.GetCollection<SupportThread>("SupportThreads");
    }

    public async Task<List<SupportThread>> GetAllThreadsAsync()
    {
        return await _threadsCollection.Find(_ => true).ToListAsync();
    }

    public async Task<List<SupportThread>> GetUserThreadsAsync(string userId)
    {
        return await _threadsCollection.Find(t => t.UserId == userId).ToListAsync();
    }

    public async Task<SupportThread> GetThreadByIdAsync(string id)
    {
        return await _threadsCollection.Find(t => t.Id == id).FirstOrDefaultAsync();
    }

    public async Task CreateThreadAsync(SupportThread thread)
    {
        thread.LastMessageTimestamp = DateTime.UtcNow;
        await _threadsCollection.InsertOneAsync(thread);
    }

    public async Task AddMessageToThreadAsync(string threadId, SupportMessage message)
    {
        var update = Builders<SupportThread>.Update
            .Push(t => t.Messages, message)
            .Set(t => t.LastMessageTimestamp, DateTime.UtcNow)
            .Inc(t => t.UnreadCount, message.IsAdmin ? 0 : 1);

        await _threadsCollection.UpdateOneAsync(t => t.Id == threadId, update);
    }

    public async Task MarkThreadAsReadAsync(string threadId)
    {
        var update = Builders<SupportThread>.Update
            .Set(t => t.UnreadCount, 0);

        await _threadsCollection.UpdateOneAsync(t => t.Id == threadId, update);
    }

    public async Task CloseThreadAsync(string threadId)
    {
        var update = Builders<SupportThread>.Update
            .Set(t => t.Status, "closed");

        await _threadsCollection.UpdateOneAsync(t => t.Id == threadId, update);
    }

    public async Task ReopenThreadAsync(string threadId)
    {
        var update = Builders<SupportThread>.Update
            .Set(t => t.Status, "open");

        await _threadsCollection.UpdateOneAsync(t => t.Id == threadId, update);
    }
}