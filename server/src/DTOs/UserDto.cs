using CacheChan.Server.Models;

namespace CacheChan.Server.DTOs
{
    public record UpdateProfileDto(string Name, string Email, string? Phone, string? Company);
    public record ChangePasswordDto(string CurrentPassword, string NewPassword);
}