using System;
using System.Threading;
using Cache_Chan.Core;
using Cache_Chan.Implementations;
using Cache_Chan.Monitoring;

class Program
{
    static void Main()
    {
        var metrics = new MetricsCollector();
        var evictionPolicy = new LruEvictionPolicy<string>();

        var cache = new MemoryCache<string, string>(
            evictionPolicy: evictionPolicy,
            metrics: metrics
        );

        Console.WriteLine("Testando Cache...\n");

        cache.Set("usuario:1", "João", TimeSpan.FromSeconds(10));
        cache.Set("usuario:2", "Maria", TimeSpan.FromSeconds(5));

        Console.WriteLine("GET usuario:1 => " + cache.Get("usuario:1")); // João
        Console.WriteLine("GET usuario:2 => " + cache.Get("usuario:2")); // Maria

        Console.WriteLine("\nAguardando expiração...");
        Thread.Sleep(6000);

        Console.WriteLine("GET usuario:2 => " + cache.Get("usuario:2")); // null (expirado)

        Console.WriteLine("\n--- MÉTRICAS ---");
        Console.WriteLine(metrics.PrintMetrics);
    }
}
