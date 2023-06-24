const realDate = document.querySelector("#realdate");
const realTime = document.querySelector("#realtime");

function updateRealTime() {
    var today = new Date;
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1));
    var day = ('0' + today.getDate()).slice(-2);
    var formattedDate = `${year}.${month}.${day}`;

    var hour = ('0' + today.getHours()).slice(-2);
    var minute = ('0' + today.getMinutes()).slice(-2);
    var second = ('0' + today.getSeconds()).slice(-2);
    var formattedTime = `${hour}:${minute}:${second}`;
    
    realDate.textContent = formattedDate;
    realTime.textContent = formattedTime;
}

setInterval(updateRealTime, 1000);
