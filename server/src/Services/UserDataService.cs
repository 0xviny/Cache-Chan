using Microsoft.Extensions.Options;
using MongoDB.Driver;
using CacheChan.Server.Models;

namespace CacheChan.Server.Services
{
    public class UserDataService
    {
        private readonly IMongoCollection<UserData> _users;

        public UserDataService(IOptions<MongoSettings> mongoSettings)
        {
            var client = new MongoClient(mongoSettings.Value.ConnectionString);
            var database = client.GetDatabase(mongoSettings.Value.Database);
            _users = database.GetCollection<UserData>("Users");
        }

        public async Task<List<UserData>> GetAllAsync()
        {
            return await _users.Find(_ => true).ToListAsync();
        }

        public async Task InsertAsync(UserData user)
        {
            await _users.InsertOneAsync(user);
        }
    }
}
