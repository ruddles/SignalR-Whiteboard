
namespace SignalR_Whiteboard.Models
{
    public class DrawInstruction
    {
        public string Tool { get; set; }
        public string Color { get; set; }
        public int LineThickness { get; set; }
        public Point StartPoint { get; set; }
        public Point EndPoint { get; set; }
    }
}