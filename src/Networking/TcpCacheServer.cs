using System.Net;
using System.Net.Sockets;
using System.Text;
using Cache_Chan.Core;

namespace Cache_Chan.Networking
{
    public class TcpCacheServer
    {
        private readonly int _port;
        private readonly ICache<string, string> _cache;
        private readonly CancellationTokenSource _cts = new CancellationTokenSource();

        public TcpCacheServer(int port, ICache<string, string> cache)
        {
            _port = port;
            _cache = cache;
        }

        public async Task StartAsync()
        {
            TcpListener listener = new TcpListener(IPAddress.Any, _port);
            listener.Start();
            Console.WriteLine($"Listening on port {_port}...");

            while (!_cts.IsCancellationRequested)
            {
                try
                {
                    var client = await listener.AcceptTcpClientAsync().ConfigureAwait(false);
                    _ = Task.Run(() => ProcessClientAsync(client), _cts.Token);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"[TCP Server] Error accepting client: {ex.Message}");
                }
            }

            listener.Stop();
        }

        public void Stop() => _cts.Cancel();

        private async Task ProcessClientAsync(TcpClient client)
        {
            using (client)
            {
                try
                {
                    var stream = client.GetStream();
                    byte[] buffer = new byte[1024];
                    int bytesRead = await stream.ReadAsync(buffer, 0, buffer.Length, _cts.Token).ConfigureAwait(false);
                    if (bytesRead <= 0) return;

                    string request = Encoding.UTF8.GetString(buffer, 0, bytesRead).Trim();
                    string response = ProcessCommand(request);
                    byte[] responseBytes = Encoding.UTF8.GetBytes(response + "\n");

                    await stream.WriteAsync(responseBytes, 0, responseBytes.Length, _cts.Token).ConfigureAwait(false);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"[TCP Server] Error processing client: {ex.Message}");
                }
            }
        }

        private string ProcessCommand(string command)
        {
            try
            {
                var tokens = command.Split(' ');
                if (tokens.Length == 0) return "Invalid command";

                switch (tokens[0].ToUpper())
                {
                    case "SET":
                        if (tokens.Length < 3) return "ERR: Uso: SET key value [TTL]";

                        string key = tokens[1];
                        string value = tokens[2];
                        TimeSpan? ttl = null;

                        if (tokens.Length == 4 && int.TryParse(tokens[3], out int ttlSeconds))
                        {
                            ttl = TimeSpan.FromSeconds(ttlSeconds);
                        }

                        _cache.Set(key, value, ttl);
                        return "OK";
                    case "GET":
                        if (tokens.Length != 2) return "ERR: Uso: GET key";
                        var result = _cache.Get(tokens[1]);
                        return result ?? "null";

                    case "DEL":
                        if (tokens.Length != 2) return "ERR: Uso: DEL key";
                        bool removed = _cache.Remove(tokens[1]);
                        return removed ? "OK" : "ERR: Key not found";

                    case "CLEAR":
                        _cache.Clear();
                        return "OK";

                    default:
                        return "ERR: Comando desconhecido";
                }
            }
            catch (Exception ex)
            {
                return $"ERR: Exception: {ex.Message}";
            }
        }
    }
}