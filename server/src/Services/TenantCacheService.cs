using System.Collections.Concurrent;

namespace CacheChan.Server.Services
{
    public class TenantCacheService
    {
        private readonly ConcurrentDictionary<string, CacheTenant> _tenants = new();

        public CacheTenant GetTenant(string apiKey)
        {
            return _tenants.GetOrAdd(apiKey, key => new CacheTenant());
        }
    }
}
