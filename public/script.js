const key = "904329b4887857a349c608a92182b8e6";

$("#submit").click(function() {
    const zip = $("#zip").val();
    // call to node server
    $.ajax({
        type: "POST",
        url: "/temperature",
        contentType: 'application/json',
        data: JSON.stringify({"zip": $("#zip").val(), "key": key}),
        success: function(data) {
            if (data[1] == null) {
                $("#output").html(`<span class='warn'>error: ${data[0]['message']}</span>`)
                return;
            } 
            let temp = parseFloat(data[0]['current']['temp']);
            let loc = data[1];
            if (temp < 33) { // freezing
                $("#output").html(`It's freezing in ${loc}!`)
            } else if (temp < 50) { // cold
                $("#output").html(`It's pretty cold in ${loc}.`)
            } else if (temp < 80) { // warm
                $("#output").html(`It's a little warm in ${loc}`)
            } else { // hot
                $("#output").html(`It's pretty hot in ${loc}!`)
            }
        }

    })
})