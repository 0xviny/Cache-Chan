namespace CacheChan.Core.Configuration
{
    internal static class MetricsConfig
    {
        public static string? Endpoint { get; } = Environment.GetEnvironmentVariable("METRICS_ENDPOINT");
    }
}