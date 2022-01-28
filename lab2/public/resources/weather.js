
$(document).ready(function() {
    // taken from MDN web docs and modified a bit
    let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    function success(pos) {
        let crd = pos.coords;
        weather_ajax(crd);
        setInterval(function() {weather_ajax(crd)}, 60000);
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        alert("You didn't let me see your location so now I can't show you my widget :(")
    }

    navigator.geolocation.getCurrentPosition(success, error, options);

});

function weather_ajax(pos) {
    console.log(`https://api.openweathermap.org/data/2.5/onecall?lat=${pos.latitude}&lon=${pos.longitude}&exclude=minutely,hourly,alerts&units=imperial&appid=904329b4887857a349c608a92182b8e6`)
    $.ajax({
        type:"POST",
        url:`https://api.openweathermap.org/data/2.5/onecall?lat=${pos.latitude}&lon=${pos.longitude}&exclude=minutely,hourly,alerts&units=imperial&appid=904329b4887857a349c608a92182b8e6`,
        dataType:"json",
        success: function(data) {
            let output = "";

            output += '<span class="icon">';
            output += `<img width="84" height="84" src="https://openweathermap.org/img/wn/${data["current"]["weather"][0].icon}@2x.png" alt="weather icon"> </span>`;
            output += '<span class="desc">';
            output += `<span class="temp">${data["current"]["temp"]}&deg; &nbsp;${data["current"]["weather"][0].description}</span>`;
            output += '<span class="hl">';
            output += '<span class="hl-labels"> Feels like:&nbsp;</span>';
            output += `<span>${data["current"]["feels_like"]}&deg; &nbsp; </span>`;
            output += '<span class="hl-labels"> High:&nbsp;</span>';
            output += `<span>${data["daily"][0]["temp"].max}&deg; &nbsp;</span>`;
            output += '<span class="hl-labels"> Low:&nbsp; </span>';
            output += `<span>${data["daily"][0]["temp"].min}&deg; &nbsp;</span>`;
            output += '</span>';
            output += '</span>';
            $('#weather').html(output).addClass("animate__animated").addClass("animate__fadeInTopLeft");
        }, error: function(msg) {
            alert("There was a problem: " + msg.status + " " + msg.statusText);
        }
    });
}