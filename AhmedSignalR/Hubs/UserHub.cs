using Microsoft.AspNetCore.SignalR;

namespace AhmedSignalR.Hubs
{
    public class UserHub: Hub
    {
        public static int TotalViews { get; set; } = 0;
        public UserHub() { }

        public async Task NewWindowLoaded()
        {
            TotalViews++;
            await Clients.All.SendAsync("UpdateTotalViews", TotalViews);
        }
    }
}
