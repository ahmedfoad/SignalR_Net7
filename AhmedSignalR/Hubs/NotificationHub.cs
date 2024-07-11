using Microsoft.AspNetCore.SignalR;

namespace AhmedSignalR.Hubs
{
    public class NotificationHub : Hub
    {
        public static List<string> Notifications { get; set; } = new();

        public async Task SendAsync(string message)
        {
            Notifications.Add(message);
            await Clients.All.SendAsync("pushNotification", message , Notifications?.Count);
        }

        public override Task OnConnectedAsync()
        {
            // Send initial notifications to the new client
            Clients.Caller.SendAsync("refreshNotifications", Notifications, Notifications.Count);
            return base.OnConnectedAsync();
        }
    }
}
