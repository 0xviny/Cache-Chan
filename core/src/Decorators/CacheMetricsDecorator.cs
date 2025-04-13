using CacheChan.Core.Interfaces;
using CacheChan.Core.Models;

namespace CacheChan.Core.Decorators
{
    public class CacheMetricsDecorator : ICacheService
    {
        private readonly ICacheService _innerCache;
        private readonly IMetricsService _metricsService;
        private readonly string _tenantApiKey;

        public CacheMetricsDecorator(ICacheService innerCache, IMetricsService metricsService, string tenantApiKey)
        {
            _innerCache = innerCache;
            _metricsService = metricsService;
            _tenantApiKey = tenantApiKey;
        }

        public void Set(string key, object value, TimeSpan? expiration = null)
        {
            _innerCache.Set(key, value, expiration);
            _metricsService.SaveMetric(_tenantApiKey, new Metrics
            {
                Timestamp = DateTime.UtcNow,
                Name = "CacheSet",
                Value = 1,
                Category = "Cache"
            });
        }

        public T Get<T>(string key)
        {
            var result = _innerCache.Get<T>(key);
            if (result != null)
            {
                _metricsService.SaveMetric(_tenantApiKey, new Metrics
                {
                    Timestamp = DateTime.UtcNow,
                    Name = "CacheHit",
                    Value = 1,
                    Category = "Cache"
                });
            }
            else
            {
                _metricsService.SaveMetric(_tenantApiKey, new Metrics
                {
                    Timestamp = DateTime.UtcNow,
                    Name = "CacheMiss",
                    Value = 1,
                    Category = "Cache"
                });
            }
            return result;
        }

        public void Remove(string key)
        {
            _innerCache.Remove(key);
            _metricsService.SaveMetric(_tenantApiKey, new Metrics
            {
                Timestamp = DateTime.UtcNow,
                Name = "CacheRemove",
                Value = 1,
                Category = "Cache"
            });
        }

        public IEnumerable<string> GetKeys() => _innerCache.GetKeys();

        public void Update(string key, object newValue, TimeSpan? newExpiration = null)
        {
            _innerCache.Update(key, newValue);
            _metricsService.SaveMetric(_tenantApiKey, new Metrics
            {
                Timestamp = DateTime.UtcNow,
                Name = "CacheUpdate",
                Value = 1,
                Category = "Cache"
            });
        }

        public Task SetAsync(string key, object value, TimeSpan? expiration = null)
            => _innerCache.SetAsync(key, value, expiration);

        public Task<T> GetAsync<T>(string key)
            => _innerCache.GetAsync<T>(key);

        public Task RemoveAsync(string key)
            => _innerCache.RemoveAsync(key);
    }
}