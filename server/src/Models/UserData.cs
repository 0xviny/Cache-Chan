using CacheChan.Server.DTOs;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CacheChan.Server.Models
{
    public class UserData
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = null!;

        public string UserName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;
        public string ApiKey { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public string Role { get; set; } = "user";
    }
}
