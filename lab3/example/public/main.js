function populate_recently_played(data, access_token) {
    let tracks = data["items"]
    let out = "<ul id='recent' class='list-group'>";
    tracks.forEach(element =>  {
        out += '<li class="list-group-item">';
        out += "<div class='card-horizontal'>";
        out += `<div class="img-square-wrapper"> <img class="thumbnail" width="200px" src="${element["track"]["album"]["images"]["1"]["url"]}" alt="album art"></div>`;
        out += '<div class="card-body">';
        out += `<h4 class="card-title song">Song name: ${element["track"]["name"]}</h4>`;

        // getLike(element["track"]["id"], access_token).done(function(response) {
        //     console.log(response[0])
        //     if (response[0]) {
        //         console.log("1")
        //         // out += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill not-liked" onclick="addLike(this)" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/> </svg>';
        //     } else {
        //         console.log(2)
        //         // out += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart liked" onclick="removeLike(this)" viewBox="0 0 16 16"> <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/> </svg>';
        //         out += "<p>please work</p>";
        //     }
        // })
        out += '<span class="not-liked" onclick="addLike(this)">&nbsp;</span>'
        
        out += `<span class="artists card-text">Artist(s): `;
        element["track"]["artists"].forEach(artist => {
            out += `<a href="https://open.spotify.com/artist/5WmX340gDNLIAyUcg4MzWN${artist["id"]}">${artist["name"]} </a>`;
        })
        
        out += `</span><p class="album card-text">Album: ${element["track"]["album"]["name"]}</p>`
        out += `<span class="addToPlaylist" onclick="alert('added to playlist')">Add to a playlist</span>`  // POST here

        out += `<p class="card-footer">Played ${parse(element["played_at"])} ago</p>`;
        out += `</div>`;
        out += "</div>";
        out += '</li>';
    })
    out += "</ul>";

    $("#recently-played").html(out)
    // console.log(out)
}
let test;
function removeLike(obj) {
    console.log("removelike")
    obj.classList.remove("liked")
    obj.classList.add("not-liked")
    obj.setAttribute('onclick', 'addLike(this)')
    // delete here
}

function addLike(obj){
    test = obj

    console.log("addlike")
    // console.log(obj)
    // console.log(obj.classList)
    obj.classList.remove("not-liked")
    obj.classList.add("liked")
    obj.setAttribute('onclick', 'removeLike(this)')
    // put here
    
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
            // console.log(data)
            populate_recently_played(data, access_token)
        }
    })

}

function getLike(id, access_token) {
    // console.log(id)
    // ajax call
    return $.ajax({
        url: `/check-like?token=${access_token}&id=${id}`,
        method: "GET",
        success: function(data) {
        }
    });

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
        console.log("Access token: " + access_token);
        refresh_token = searchParams.get("refresh_token");
        getInfo(access_token);
        recent(access_token);
        // console.log('test')
    } else {
        $( "div.failure" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
    }
});

