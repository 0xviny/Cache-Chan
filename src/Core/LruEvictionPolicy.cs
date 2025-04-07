using System.Collections.Concurrent;

namespace Cache_Chan.Core
{
    public class LruEvictionPolicy<TKey> : IEvictionPolicy<TKey>
    {
#pragma warning disable CS8714 // The type cannot be used as type parameter in the generic type or method. Nullability of type argument doesn't match 'notnull' constraint.
        private readonly ConcurrentDictionary<TKey, DateTime> _accessTimes = new ConcurrentDictionary<TKey, DateTime>();
#pragma warning restore CS8714 // The type cannot be used as type parameter in the generic type or method. Nullability of type argument doesn't match 'notnull' constraint.

        public void KeyAccessed(TKey key)
        {
            _accessTimes[key] = DateTime.UtcNow;
        }

        public void KeyAdded(TKey key)
        {
            _accessTimes[key] = DateTime.UtcNow;
        }

        public void KetRemoved(TKey key)
        {
            _accessTimes.TryRemove(key, out _);
        }

        public TKey SelectKeyToEvict(IReadOnlyCollection<TKey> keys)
        {
            var keyToEvict = keys.OrderBy(k => _accessTimes.TryGetValue(k, out DateTime lastAccess) ? lastAccess : DateTime.MinValue)
                                 .FirstOrDefault();
            return keyToEvict!;
        }
    }
}