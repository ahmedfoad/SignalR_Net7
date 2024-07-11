var connectionNotification = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/notification")
    .build();

connectionNotification.on('pushNotification', (notification, notificationCounter) => {
    debugger;
    $('#notificationCounter').text(notificationCounter.toString());
    $('#messageList').append('<li>Notification - ' + notification + '</li>');
});

connectionNotification.on('refreshNotifications', (notifications, counter) => {
    
    $('#notificationCounter').text(counter.toString());
    notifications.reverse().forEach(notification => {
        debugger;
        $('#messageList').append('<li>Notification - ' + notification + '</li>');
    });
});

let sendButton = document.getElementById("sendButton");
let notificationInput = document.getElementById("notificationInput");

sendButton.addEventListener("click", function (event) {
    debugger;
    let message = notificationInput.value;

    // Check if the connection is in the 'Connected' state
    if (connectionNotification.state === signalR.HubConnectionState.Connected) {
        connectionNotification.send("SendAsync", message)
            .then(() => {
                $('#messageList').append('<li>Notification - ' + message + '</li>');
            })
            .catch(err => {
                console.error("Error sending message: ", err);
            });
    } else {
        console.error("Connection is not in the 'Connected' state.");
    }

    event.preventDefault();
});



function fulfilled() {
    console.log("SignalR Connected");
    
}

function rejected() {
    console.log("Connection rejected");
    setTimeout(() => connectionNotification.start().then(fulfilled).catch(rejected), 5000); // Retry connection after 5 seconds
}

// Start Connection
connectionNotification.start().then(fulfilled).catch(rejected);
