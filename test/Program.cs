using CacheChan.Core.Interfaces;
using CacheChan.Core.Utils;

class Program
{
    static void Main()
    {
        ICacheService cache = CacheFactory.CreateCache();
        cache.Set("test", "testadoooo", TimeSpan.FromSeconds(10));
        Console.WriteLine(cache.Get<string>("test"));

        Task.Delay(TimeSpan.FromSeconds(12)).Wait();
        Console.WriteLine(cache.Get<string>("test") ?? "erro acabao");
    }
}
