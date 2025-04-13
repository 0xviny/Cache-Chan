namespace CacheChan.Core.Interfaces
{
    public interface ICacheService
    {
        void Set(string Key, object Value, TimeSpan? expiration = null);

        T Get<T>(string Key);

        void Remove(string Key);

        IEnumerable<string> GetKeys();

        void Update(string Key, object newValue, TimeSpan? newExpiration = null);

        Task SetAsync(string Key, object Value, TimeSpan? expiration = null);
        Task<T> GetAsync<T>(string Key);
        
        Task RemoveAsync(string Key);
    }
}