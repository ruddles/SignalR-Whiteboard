using System;
using System.Collections.Generic;
using System.Linq;
using SignalR.Hubs;
using SignalR_Whiteboard.Models;

namespace SignalR_Whiteboard
{
    public class Whiteboard : Hub, IDisconnect
    {
        private static readonly TimeSpan clearLimit = TimeSpan.FromMinutes(1);
        private static DateTime lastClear = DateTime.Now.AddHours(-1);

        private static IList<User> users = new List<User>();
        private static IList<DrawInstruction> instructions = new List<DrawInstruction>();

        public void Join(string name)
        {
            if (users.FirstOrDefault(u => u.Name == name) != null)
            {
                throw new InvalidOperationException("Name is already in use");
            }

            User user = users.FirstOrDefault(u => u.Id == Context.ClientId);
            if (user == null)
            {
                user = new User
                    {
                        Name = name,
                        Id = Context.ClientId
                    };
                users.Add(user);
            }
            else
            {
                user.Name = name;
            }

            Clients.addUser(user);
            Caller.replayInstructions(instructions);
        }

        public IList<User> GetUsers()
        {
            return users;
        }

        public void OnDrawPen(Point prev, Point current, string color, int width)
        {
            Clients.drawPen(prev, current, color, width);
            instructions.Add(
                new DrawInstruction
                {
                    StartPoint = prev,
                    EndPoint = current,
                    Color = color,
                    LineThickness = width,
                    Tool = "Pen"
                });
        }

        public void ClearBoard()
        {
            if (DateTime.Now - lastClear > clearLimit)
            {
                lastClear = DateTime.Now;
                Clients.clear();
                instructions.Clear();
            }
        }

        public void Disconnect()
        {
            User user = users.FirstOrDefault(u => u.Id == Context.ClientId);

            if (user != null)
            {
                users.Remove(user);
                Clients.removeUser(user);
            }
        }
    }
}