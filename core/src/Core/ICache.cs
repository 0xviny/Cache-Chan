namespace Cache_Chan.Core
{
    public interface ICache<TKey, TValue>
    {
        TValue Get(TKey key);
        void Set(TKey key, TValue value, TimeSpan? expiration = null);

        bool Remove(TKey key);
        void Clear();

        IEnumerable<KeyValuePair<TKey, TValue>> List();
    }
}