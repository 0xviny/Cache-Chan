using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CacheChan.Core.Interfaces;
using CacheChan.Core.Models;

namespace CacheChan.Core.Services
{
    public class LruCacheService : ICacheService, IDisposable
    {
        private readonly int _capacity;
        private readonly Dictionary<string, LinkedListNode<string>> _nodes;
        private readonly LinkedList<string> _usageOrder;
        private readonly Dictionary<string, CacheItemInternal> _cache;
        private readonly TimeSpan _defaultExpiration;
        private readonly object _lock = new();

        public LruCacheService(int capacity = 100, TimeSpan? defaultExpiration = null)
        {
            _capacity = capacity;
            _cache = new();
            _nodes = new();
            _usageOrder = new();
            _defaultExpiration = defaultExpiration ?? TimeSpan.FromMinutes(5);
        }

        public void Set(string key, object value, TimeSpan? expiration = null)
        {
            lock (_lock)
            {
                if (_cache.ContainsKey(key))
                {
                    _cache[key] = new CacheItemInternal(value, DateTime.UtcNow + (expiration ?? _defaultExpiration));
                    MoveToFront(key);
                }
                else
                {
                    if (_cache.Count >= _capacity)
                    {
                        RemoveLeastRecentlyUsed();
                    }

                    _cache[key] = new CacheItemInternal(value, DateTime.UtcNow + (expiration ?? _defaultExpiration));
                    var node = new LinkedListNode<string>(key);
                    _usageOrder.AddFirst(node);
                    _nodes[key] = node;
                }
            }
        }

        public T Get<T>(string key)
        {
            lock (_lock)
            {
                if (_cache.TryGetValue(key, out var item))
                {
                    if (DateTime.UtcNow < item.Expiration)
                    {
                        MoveToFront(key);
                        return (T)item.Value;
                    }
                    Remove(key);
                }

                return default!;
            }
        }

        public async Task<T> GetAsync<T>(string key)
        {
            return await Task.Run(() => Get<T>(key));
        }

        public async Task SetAsync(string key, object value, TimeSpan? expiration = null)
        {
            await Task.Run(() => Set(key, value, expiration));
        }

        public void Remove(string key)
        {
            lock (_lock)
            {
                if (_cache.Remove(key))
                {
                    if (_nodes.TryGetValue(key, out var node))
                    {
                        _usageOrder.Remove(node);
                        _nodes.Remove(key);
                    }
                }
            }
        }

        public async Task RemoveAsync(string key)
        {
            await Task.Run(() => Remove(key));
        }

        public void Update(string key, object newValue, TimeSpan? newExpiration = null)
        {
            Set(key, newValue, newExpiration);
        }

        public IEnumerable<string> GetKeys()
        {
            lock (_lock)
            {
                return _cache.Keys.ToList();
            }
        }

        private void MoveToFront(string key)
        {
            if (_nodes.TryGetValue(key, out var node))
            {
                _usageOrder.Remove(node);
                _usageOrder.AddFirst(node);
            }
        }

        private void RemoveLeastRecentlyUsed()
        {
            var lruKey = _usageOrder.Last?.Value;
            if (lruKey is not null)
            {
                Remove(lruKey);
            }
        }

        public void Dispose()
        {
            lock (_lock)
            {
                _cache.Clear();
                _usageOrder.Clear();
                _nodes.Clear();
            }
        }
    }
}
