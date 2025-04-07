using System.Threading;

namespace Cache_Chan.Monitoring
{
    public class MetricsCollector
    {
        private long _hitCount = 0;
        private long _missCount = 0;
        private long _evictionCount = 0;
        private long _totalRequests = 0;

        public void RecordHit()
        {
            Interlocked.Increment(ref _hitCount);
            Interlocked.Increment(ref _totalRequests);
        }

        public void RecordMiss()
        {
            Interlocked.Increment(ref _missCount);
            Interlocked.Increment(ref _totalRequests);
        }

        public void RecordEviction()
        {
            Interlocked.Increment(ref _evictionCount);
        }

        public long HitCount => Interlocked.Read(ref _hitCount);
        public long MissCount => Interlocked.Read(ref _missCount);
        public long EvictionCount => Interlocked.Read(ref _evictionCount);
        public long TotalRequests => Interlocked.Read(ref _totalRequests);

        public double HitRate => TotalRequests > 0 ? (double)HitCount / TotalRequests : 0;

        public string PrintMetrics =>
            $"Total Requests: {TotalRequests}\nHits: {HitCount}\nMisses: {MissCount}\nEvictions: {EvictionCount}\nHit Rate: {HitRate:P2}";
    }
}
