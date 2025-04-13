using CacheChan.Core.Configuration;
using CacheChan.Core.Decorators;
using CacheChan.Core.Interfaces;
using CacheChan.Core.Services;

namespace CacheChan.Core.Utils
{
    public static class CacheFactory
    {
        public static ICacheService CreateCache(string apiKey = null!, CacheOptions options = null!)
        {
            options ??= new CacheOptions();

            ICacheService cache;

            if (options.UseLru)
            {
                cache = new LruCacheService(
                    capacity: options.LruCapacity,
                    defaultExpiration: TimeSpan.FromMinutes(options.DefaultExpirationMinutes)
                );
            }
            else
            {
                cache = new CacheService(options);
            }

            if (!string.IsNullOrWhiteSpace(apiKey))
            {
                IMetricsService metrics = new MetricsService();
                cache = new CacheMetricsDecorator(cache, metrics, apiKey);
            }

            return cache;
        }
    }
}
