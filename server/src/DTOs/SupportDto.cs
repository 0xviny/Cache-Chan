namespace CacheChan.Server.DTOs;

public record CreateThreadRequest(string Subject, string Message);
public record SendMessageRequest(string Message);