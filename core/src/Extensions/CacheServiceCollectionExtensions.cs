using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using CacheChan.Core.Configuration;
using CacheChan.Core.Interfaces;
using CacheChan.Core.Utils;

namespace CacheChan.Core.Extensions
{
    public static class CacheServiceCollectionExtensions
    {
        public static IServiceCollection AddCacheChan(
            this IServiceCollection services,
            Action<CacheOptions> configureOptions)
        {
            services.Configure(configureOptions);

            services.AddSingleton<ICacheService>(provider =>
                CacheFactory.CreateCache()
            );

            return services;
        }
    }
}
