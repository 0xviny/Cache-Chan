using Cache_Chan.Core;
using Cache_Chan.Implementations;
using Cache_Chan.Monitoring;

namespace CacheChan.Server.Services
{
    public class CacheTenant
    {
        public ICache<string, string> MemoryCache { get; }
        public MetricsCollector Metrics { get; }

        public CacheTenant()
        {
            Metrics = new MetricsCollector();
            MemoryCache = new MemoryCache<string, string>(maxCapacity: 10000, evictionPolicy: new LruEvictionPolicy<string>(), metrics: Metrics);
        }
    }
}
