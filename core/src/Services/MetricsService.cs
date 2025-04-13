using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using CacheChan.Core.Configuration;
using CacheChan.Core.Interfaces;
using CacheChan.Core.Models;

namespace CacheChan.Core.Services
{
    public class MetricsService : IMetricsService, IDisposable
    {
        private readonly ILoggerService _logger;
        private readonly ConcurrentQueue<Metrics> _metricsQueue = new ConcurrentQueue<Metrics>();
        private readonly HttpClient _httpClient;
        private readonly Timer _flushTimer;
        private bool _disposed;

        public MetricsService(ILoggerService logger = null!)
        {
            _logger = logger;
            _httpClient = new HttpClient();
            _flushTimer = new Timer(async _ => await FlushMetricsAsync(), null, TimeSpan.FromSeconds(60), TimeSpan.FromSeconds(60));
        }

        public void SaveMetric(string apiKey, Metrics metric)
        {
            try
            {
                metric.UserId = apiKey;
                _metricsQueue.Enqueue(metric);
                _logger?.LogInfo($"Metric '{metric.Name}' added to queue.");
            }
            catch (Exception ex)
            {
                _logger?.LogError("Error adding metric to queue.", ex);
                throw;
            }
        }

        public async Task SaveMetricAsync(string apiKey, Metrics metric)
        {
            try
            {
                metric.UserId = apiKey;
                _metricsQueue.Enqueue(metric);
                _logger?.LogInfo($"Metric '{metric.Name}' added to queue (async).");
                await Task.CompletedTask;
            }
            catch (Exception ex)
            {
                _logger?.LogError("Error adding metric to queue (async).", ex);
                throw;
            }
        }

        public async Task FlushMetricsAsync()
        {
            if (_metricsQueue.IsEmpty)
                return;

            var metricsToSend = new List<Metrics>();
            while (_metricsQueue.TryDequeue(out var metric))
            {
                metricsToSend.Add(metric);
            }

            if (metricsToSend.Count == 0)
                return;

            try
            {
                var json = JsonSerializer.Serialize(metricsToSend);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var endpoint = MetricsConfig.Endpoint ?? throw new Exception("The API endpoint was not defined.");
                var response = await _httpClient.PostAsync(endpoint, content);
                if (response.IsSuccessStatusCode)
                {
                    _logger?.LogInfo($"Sent {metricsToSend.Count} metrics to API successfully.");
                }
                else
                {
                    _logger?.LogError("Failed to send metrics to API.", new Exception(response.ReasonPhrase));

                    foreach (var metric in metricsToSend)
                    {
                        _metricsQueue.Enqueue(metric);
                    }
                }
            }
            catch (Exception ex)
            {
                _logger?.LogError("Error sending metrics to API.", ex);

                foreach (var metric in metricsToSend)
                {
                    _metricsQueue.Enqueue(metric);
                }
            }
        }

        public void Dispose()
        {
            if (!_disposed)
            {
                _flushTimer?.Dispose();
                _httpClient?.Dispose();
                _disposed = true;
            }
        }
    }
}
