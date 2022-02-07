function populate_recently_played(data) {
    let tracks = data["items"]
    let out = "<ul id='recent' class='list-group'>";
    tracks.forEach(element =>  {
        out += '<li class="list-group-item">';
        out += "<div class='card-horizontal'>";
        out += `<div class="img-square-wrapper"> <img class="thumbnail" width="200px" src="${element["track"]["album"]["images"]["1"]["url"]}" alt="album art"></div>`
        out += '<div class="card-body">';
        out += `<h4 class="card-title song">Song name: ${element["track"]["name"]}</h4>`;
        out += `<span class="artists card-text">Artist(s): `;
        element["track"]["artists"].forEach(artist => {
            out += `<a href="https://open.spotify.com/artist/5WmX340gDNLIAyUcg4MzWN${artist["id"]}">${artist["name"]} </a>`;
        })
        out += `</span><p class="album card-text">Album: ${element["track"]["album"]["name"]}</p>`
        out += `<p class="card-footer">Played ${parse(element["played_at"])} ago</p>`;
        out += `</div>`;
        out += "</div>";
        out += '</li>';
    })
    out += "</ul>";

    $("#recently-played").html(out)
    // console.log(out)
}
function parse(date) {
    timestamp = Date.parse(date);
    diff = Math.floor((Date.now()-timestamp)/1000);
    if (diff < 60) {
        return `${diff} seconds`;
    } else if (diff < 3600) {
        return `${Math.floor(diff/60)} minute${Math.floor(diff/60)===1?"":"s"}`;
    } else if (diff < 86400) {
        return `${Math.floor(diff/3600)} hour${Math.floor(diff/3600)===1?"":"s"}`;
    } else {
        return `${Math.floor(diff/86400)} day${Math.floor(diff/86400)===1?"":"s"}`;
    }
    
}
let searchParams = new URLSearchParams(window.location.search)

function getInfo(access_token) {
    $.ajax({
        url: `/info?token=${access_token}`,
        method: "GET",
        success: function(data) {
            console.log(data);
            out = `<h1>Signed in as ${data["display_name"]}</h1> <p> You are a ${data["product"]} user.</p>`;
            $("#loggedin").html(out)
        }
    })

}

function recent(access_token) {
    $.ajax({
        url: `/recent?token=${access_token}`,
        method: "GET",
        success: function(data) {
            console.log(data)
            populate_recently_played(data)
        }
    })

}

let refresh;

$( document ).ready(function() {
    if (searchParams.has("logged_in")) {
        // $("#login").hide("fast");
        // $("#loggedin").show("fast");

        $("#login").css("visibility", "hidden");
        $("#loggedin").css("visibility", "visible");
        $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
        let access_token = searchParams.get("access_token");
        refresh_token = searchParams.get("refresh_token");
        getInfo(access_token);
        recent(access_token);
        // console.log('test')
    } else {
        $( "div.failure" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
    }
});

