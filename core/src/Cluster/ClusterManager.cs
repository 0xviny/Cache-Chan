using System.Net.Sockets;
using System.Text;

namespace Cache_Chan.Cluster
{
    public class ClusterManager
    {
        private readonly List<string> _nodeEndpoints;

        public ClusterManager(List<string> nodeEndpoints)
        {
            _nodeEndpoints = nodeEndpoints;
        }

        public async Task BroadcastCommandAsync(string command)
        {
            foreach (var endpoint in _nodeEndpoints)
            {
                try
                {
                    var parts = endpoint.Split(':');

                    string host = parts[0];
                    int port = int.Parse(parts[1]);

                    using TcpClient client = new TcpClient();
                    await client.ConnectAsync(host, port);

                    var stream = client.GetStream();
                    byte[] data = Encoding.UTF8.GetBytes(command + "\n");

                    await stream.WriteAsync(data, 0, data.Length);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"[ClusterManager] Failed to send command to {endpoint}: {ex.Message}");
                }
            }
        }
    }
}