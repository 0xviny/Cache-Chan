using CacheChan.Core;
using CacheChan.Core.Interfaces;
using CacheChan.Core.Utils;

class Program
{
    static void Main()
    {
        ICacheService cacheSemMetricas = CacheFactory.CreateCache();

        cacheSemMetricas.Set("teste", 42);
        var valor = cacheSemMetricas.Get<int>("teste");
    }
}
