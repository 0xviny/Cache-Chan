using System;
using System.Collections.Concurrent;
using Cache_Chan.Core;
using Cache_Chan.Implementations;
using Cache_Chan.Monitoring;

namespace CacheChan.Core
{
    public class CacheTenant
    {
        public ICache<string, string> MemoryCache { get; }
        public MetricsCollector Metrics { get; }

        public CacheTenant()
        {
            Metrics = new MetricsCollector();
            MemoryCache = new MemoryCache<string, string>(maxCapacity: 10000,
                                                          evictionPolicy: new LruEvictionPolicy<string>(),
                                                          metrics: Metrics);
        }
    }

    public class CacheManager
    {
        private readonly string _apiKey;
        private static readonly ConcurrentDictionary<string, CacheTenant> _tenants = new();

        public CacheManager(string apiKey)
        {
            _apiKey = apiKey ?? throw new ArgumentNullException(nameof(apiKey));
        }

        private CacheTenant Tenant => _tenants.GetOrAdd(_apiKey, key => new CacheTenant());

        public void Set(string key, string value, TimeSpan? ttl = null)
        {
            Tenant.MemoryCache.Set(key, value, ttl);
        }

        public string? Get(string key)
        {
            return Tenant.MemoryCache.Get(key);
        }

        public bool Remove(string key)
        {
            return Tenant.MemoryCache.Remove(key);
        }

        public void Clear()
        {
            Tenant.MemoryCache.Clear();
        }

        public MetricsCollector GetMetrics()
        {
            return Tenant.Metrics;
        }
    }
}
