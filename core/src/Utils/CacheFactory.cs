using CacheChan.Core.Configuration;
using CacheChan.Core.Decorators;
using CacheChan.Core.Interfaces;
using CacheChan.Core.Services;

namespace CacheChan.Core.Utils
{
    public class CacheFactory
    {
        private readonly CacheOptions _options;

        public CacheFactory(CacheOptions options)
        {
            _options = options ?? throw new ArgumentNullException(nameof(options));
        }

        public ICacheService CreateCache(string apiKey = null!)
        {
            ICacheService cache;

            if (_options.UseLru)
            {
                cache = new LruCacheService(
                    capacity: _options.LruCapacity,
                    defaultExpiration: TimeSpan.FromMinutes(_options.DefaultExpirationMinutes)
                );
            }
            else
            {
                cache = new CacheService(_options);
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
