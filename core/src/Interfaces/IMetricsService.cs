using CacheChan.Core.Models;

namespace CacheChan.Core.Interfaces
{
    public interface IMetricsService
    {
        void SaveMetric(string apiKey, Metrics metrics);

        Task SaveMetricAsync(string apiKey, Metrics metrics);
    }
}