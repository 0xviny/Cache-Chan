using System;

namespace CacheChan.Core.Configuration
{
    public class CacheOptions
    {
        public bool UseLru { get; set; } = false;
        public int LruCapacity { get; set; } = 100;
        public int DefaultExpirationMinutes { get; set; } = 60;
        public int CleanupIntervalSeconds { get; set; } = 300;
    }
}