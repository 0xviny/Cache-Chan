namespace Cache_Chan.Core
{
    public interface IEvictionPolicy<TKey>
    {
        void KeyAccessed(TKey key);
        void KeyAdded(TKey key);
        void KetRemoved(TKey key);

        TKey SelectKeyToEvict(IReadOnlyCollection<TKey> keys);
    }
}
