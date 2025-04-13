using System.Collections.Concurrent;
using CacheChan.Core.Models;

namespace CacheChan.Core.Utils
{
    internal class CacheCleaner
    {
        private readonly ConcurrentDictionary<string, CacheItemInternal> _cache;
        private readonly TimeSpan _interval;
        private CancellationTokenSource? _cts;

        public CacheCleaner(ConcurrentDictionary<string, CacheItemInternal> cache, TimeSpan interval)
        {
            _cache = cache;
            _interval = interval;
        }

        public void Start()
        {
            _cts = new CancellationTokenSource();
            Task.Run(() => CleanLoop(_cts.Token));
        }

        public void Stop()
        {
            _cts?.Cancel();
        }

        private async Task CleanLoop(CancellationToken token)
        {
            while (!token.IsCancellationRequested)
            {
                var now = DateTime.UtcNow;
                var keysToRemove = _cache.Where(pair => pair.Value.Expiration <= now)
                                         .Select(pair => pair.Key)
                                         .ToList();
                foreach (var key in keysToRemove)
                {
                    _cache.TryRemove(key, out _);
                }
                await Task.Delay(_interval, token);
            }
        }
    }
}