using CacheChan.Core.Interfaces;

namespace CacheChan.Core.Services
{
    public class LoggerService : ILoggerService
    {
        public void LogInfo(string message)
        {
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine($"[INFO] {message}");
            Console.ResetColor();
        }

        public void LogError(string message, System.Exception ex)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($"[ERROR] {message}");
            Console.ResetColor();
            Console.WriteLine(ex);
        }
    }
}