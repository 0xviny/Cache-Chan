namespace CacheChan.Core.Interfaces
{
    public interface ILoggerService
    {
        void LogInfo(string message);
        void LogError(string message, System.Exception ex);
    }
}