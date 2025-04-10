using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CacheChan.Server.Models;

public class SupportThread
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = null!;

    public string UserId { get; set; } = null!;
    public string UserName { get; set; } = null!;
    public string UserEmail { get; set; } = null!;
    public string Subject { get; set; } = null!;
    public string Status { get; set; } = "open";
    public DateTime LastMessageTimestamp { get; set; }
    public int UnreadCount { get; set; } = 0;
    public List<SupportMessage> Messages { get; set; } = new();
}

public class SupportMessage
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = null!;

    public string ThreadId { get; set; } = null!;
    public string UserId { get; set; } = null!;
    public string UserName { get; set; } = null!;
    public string UserEmail { get; set; } = null!;
    public bool IsAdmin { get; set; }
    public string Message { get; set; } = null!;
    public DateTime Timestamp { get; set; }
    public bool Read { get; set; } = false;
}