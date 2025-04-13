using System.Collections.Concurrent;
using CacheChan.Core.Configuration;
using CacheChan.Core.Interfaces;
using CacheChan.Core.Models;
using CacheChan.Core.Utils;

namespace CacheChan.Core.Services
{
    public class CacheService : ICacheService, IDisposable
    {
        private readonly ConcurrentDictionary<string, CacheItemInternal> _cache = new();
        private readonly CacheOptions _options;
        private readonly CacheCleaner _cleaner;

        public CacheService(CacheOptions options = null!)
        {
            _options = options ?? new CacheOptions();
            _cleaner = new CacheCleaner(_cache, TimeSpan.FromSeconds(_options.CleanupIntervalSeconds));

            _cleaner.Start();
        }

        public void Set(string key, object value, TimeSpan? expiration = null)
        {
            var expTime = DateTime.UtcNow.Add(expiration ?? TimeSpan.FromMinutes(_options.DefaultExpirationMinutes));
            var item = new CacheItemInternal(value, expTime);

            _cache[key] = item;
        }

        public T Get<T>(string key)
        {
            if (_cache.TryGetValue(key, out var item))
            {
                if (DateTime.UtcNow < item.Expiration)
                {
                    return (T)item.Value;
                }
                else
                {
                    Remove(key);
                }
            }

            return default!;
        }

        public void Remove(string key)
        {
            _cache.TryRemove(key, out _);
        }

        public IEnumerable<string> GetKeys()
        {
            return _cache.Keys.ToList();
        }

        public void Update(string key, object newValue, TimeSpan? newExpiration = null)
        {
            if (_cache.ContainsKey(key))
            {
                var old = _cache[key];
                _cache[key] = new CacheItemInternal(newValue, DateTime.UtcNow.Add(newExpiration ?? TimeSpan.FromMinutes(_options.DefaultExpirationMinutes)));
            }
            else
            {
                throw new KeyNotFoundException($"A cache item with the key '{key}' was not found.");
            }
        }

        public async Task SetAsync(string key, object value, TimeSpan? expiration = null)
        {
            await Task.Run(() => Set(key, value, expiration));
        }

        public async Task<T> GetAsync<T>(string key)
        {
            return await Task.Run(() => Get<T>(key));
        }

        public async Task RemoveAsync(string key)
        {
            await Task.Run(() => Remove(key));
        }

        public void Dispose()
        {
            _cleaner?.Stop();
        }
    }
}