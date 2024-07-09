using Microsoft.AspNetCore.SignalR;
using SignalRSample;

namespace AhmedSignalR.Hubs
{
    public class DeathlyHallowsHub : Hub
    {
        public Dictionary<string, int> GetRaceStatus()
        {
            return SD.DealthyHallowRace;
        }
    }
}
