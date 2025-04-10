namespace CacheChan.Server.Models
{
    public class CacheItemDto
    {
        public string Key { get; set; } = default!;
        public string Value { get; set; } = default!;
        public string Type { get; set; } = "string";
        public string Size { get; set; } = "N/A";
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public string Status { get; set; } = "active";
    }
}
