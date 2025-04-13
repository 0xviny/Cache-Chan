namespace CacheChan.Core.Models
{
    public class Metrics
    {
        public string? Id { get; set; }

        public string? UserId { get; set; }

        public DateTime? Timestamp { get; set; }

        public string? Name { get; set; }

        public double? Value { get; set; }

        public string? Category { get; set; }
    }
}