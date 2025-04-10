using Cache_Chan.Core;

class Program
{
    static void Main()
    {
        // O cliente fornece sua API Key
        var apiKey = "APIKEY-DO-USUARIO"; 
        var cacheManager = new CahceManager(apiKey);

        // Define um valor com um TTL de 10 minutos
        cacheManager.Set("usuario:1", "João", TimeSpan.FromMinutes(10));

        // Recupera o valor
        var valor = cacheManager.Get("usuario:1");
        Console.WriteLine("Valor para 'usuario:1': " + (valor ?? "não encontrado"));

        // Obtém as métricas específicas do cache deste usuário
        var metrics = cacheManager.GetMetrics();
        Console.WriteLine($"Total Requests: {metrics.TotalRequests}, Hit Rate: {metrics.HitRate:P2}");
    }
}
