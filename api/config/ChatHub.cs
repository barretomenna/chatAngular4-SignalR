using Microsoft.AspNetCore.SignalR;

namespace api.config
{
    public class ChatHub : Hub
    {
        public void SendToAll(string message)
        {
            Clients.All.InvokeAsync("sendToAll", message);
        }
    }
}