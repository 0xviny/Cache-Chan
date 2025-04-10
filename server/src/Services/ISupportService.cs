using CacheChan.Server.Models;

namespace CacheChan.Server.Services
{
    public interface ISupportService
    {
        Task<SupportThread> CreateThreadAsync(string userId, string subject, string message, string userName, string userEmail);
        Task<List<SupportThread>> GetThreadsAsync(string? userId = null);
        Task<SupportThread?> GetThreadByIdAsync(string id);
        Task<SupportMessage> SendMessageAsync(string threadId, string userId, string message, bool isAdmin, string userName, string userEmail);
        Task MarkThreadAsReadAsync(string threadId, string userId);
        Task UpdateThreadStatusAsync(string threadId, string newStatus);
    }
}
