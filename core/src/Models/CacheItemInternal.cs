namespace CacheChan.Core.Models
{
    internal class CacheItemInternal
    {
        public object Value { get; }
        public DateTime Expiration { get; set; }

        public CacheItemInternal(object value, DateTime expiration)
        {
            Value = value;
            Expiration = expiration;
        }
    }
}