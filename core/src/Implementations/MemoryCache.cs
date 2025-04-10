using System;
using System.Collections.Concurrent;
using System.Threading;
using Cache_Chan.Core;
using Cache_Chan.Monitoring;

namespace Cache_Chan.Implementations
{
    public class MemoryCache<TKey, TValue> : ICache<TKey, TValue>, IDisposable where TKey : notnull
    {
        private readonly ConcurrentDictionary<TKey, CacheItem<TValue>> _cache = new();
        private readonly IEvictionPolicy<TKey> _evictionPolicy;
        private readonly MetricsCollector? _metrics;
        private readonly int _maxCapacity;
        private readonly Timer _cleanupTimer;

        public MemoryCache(
            int maxCapacity = 10000,
            IEvictionPolicy<TKey>? evictionPolicy = null,
            MetricsCollector? metrics = null
        )
        {
            _maxCapacity = maxCapacity;
            _evictionPolicy = evictionPolicy ?? new LruEvictionPolicy<TKey>();
            _metrics = metrics;

            _cleanupTimer = new Timer(CleanupExpiredItems, null, TimeSpan.FromSeconds(10), TimeSpan.FromSeconds(10));
        }

        public TValue Get(TKey key)
        {
            if (_cache.TryGetValue(key, out var item))
            {
                if (item.IsExpired)
                {
                    Remove(key);
                    _metrics?.RecordMiss();
                    return default!;
                }

                item.LastAccess = DateTime.UtcNow;
                _evictionPolicy.KeyAccessed(key);
                _metrics?.RecordHit();
                return item.Value;
            }

            _metrics?.RecordMiss();
            return default!;
        }

        public void Set(TKey key, TValue value, TimeSpan? ttl = null)
        {
            if (_cache.Count >= _maxCapacity)
            {
                EvictOneItem();
            }

            var item = new CacheItem<TValue>(value, ttl);
            _cache[key] = item;
            _evictionPolicy.KeyAdded(key);
        }

        public bool Remove(TKey key)
        {
            bool removed = _cache.TryRemove(key, out _);
            if (removed)
            {
                _evictionPolicy.KetRemoved(key);
                _metrics?.RecordEviction();
            }
            return removed;
        }

        public void Clear()
        {
            _cache.Clear();
        }

        public void EvictOneItem()
        {
            var keyToEvict = _evictionPolicy.SelectKeyToEvict(_cache.Keys.ToList());

            if (keyToEvict is not null)
            {
                Remove(keyToEvict);
            }
        }

        private void CleanupExpiredItems(object? state)
        {
            foreach (var key in _cache.Keys)
            {
                if (_cache.TryGetValue(key, out var item) && item.IsExpired)
                {
                    Remove(key);
                }
            }
        }

        public void Dispose()
        {
            _cleanupTimer.Dispose();
        }

        public IEnumerable<KeyValuePair<TKey, TValue>> List()
        {
            return _cache
                .Where(kvp => !kvp.Value.IsExpired)
                .Select(kvp => new KeyValuePair<TKey, TValue>(kvp.Key, kvp.Value.Value));
        }
    }
}
