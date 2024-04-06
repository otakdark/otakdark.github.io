function updateTime() {
    var now = new Date();
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var day = days[now.getDay()];
    var date = now.getDate();
    var month = now.getMonth() + 1; // Months are zero indexed
    var year = now.getFullYear();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    // Format the time
    var timeString = day + ', ' + date + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;

    // Update the HTML element
    document.getElementById('waktu').textContent = timeString;
}

// Call updateTime every second (1000 milliseconds)
setInterval(updateTime, 1000);

// Initial call to display the time immediately
updateTime();
