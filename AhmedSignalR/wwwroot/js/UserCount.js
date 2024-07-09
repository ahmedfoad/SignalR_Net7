// 1- create connection
var connectionUserCount = new signalR.HubConnectionBuilder()
    //.configureLogging(signalR.LogLevel.Information)
    //.withAutomaticReconnect()
    .withUrl("/hubs/userCount", signalR.HttpTransportType.WebSockets).build();

//connect to methods that hub invokes aka receive notfications from hub
connectionUserCount.on("updateTotalViews", (value) => {
    $("#totalViewsCounter").text(value.toString());
});

connectionUserCount.on("updateTotalUsers", (value) => {
    $("#totalUsersCounter").text(value.toString());
});
 
// 2- invoke hub methods aka send notification to hub
function newWindowLoadedOnClient()
{
    connectionUserCount.invoke("NewWindowLoaded").then((value) => console.log(value));
}

function fulfield() {
    console.log("SignlR Connected");
    newWindowLoadedOnClient();
}
function rejected() {
    console.log("rejected");
}
// 3- Start Connection
connectionUserCount.start().then(fulfield, rejected);
