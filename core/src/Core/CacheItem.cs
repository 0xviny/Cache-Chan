using System;

namespace Cache_Chan.Core
{
    public class CacheItem<T>
    {
        public T Value { get; }
        public DateTime? Expiration { get; }
        public DateTime LastAccess { get; set; }

        public CacheItem(T value, TimeSpan? ttl)
        {
            Value = value;
            if (ttl.HasValue)
            {
                Expiration = DateTime.UtcNow.Add(ttl.Value);
            }
            LastAccess = DateTime.UtcNow;
        }

        public bool IsExpired => Expiration.HasValue && DateTime.UtcNow > Expiration.Value;
    }
}
