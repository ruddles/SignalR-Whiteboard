using System;

namespace SignalR_Whiteboard.Models
{
    public class SystemMessage
    {
        public SystemMessage(string message)
        {
            this.Message = message;
            Timestamp = DateTimeOffset.UtcNow;
        }

        public string Message { get; set; }
        public DateTimeOffset Timestamp { get; set; }
    }
}