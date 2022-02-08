(function() {

/**
 * Obtains parameters from the hash of the URL
 * @return Object
 */
function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}

var userProfileSource = document.getElementById('user-profile-template').innerHTML,
    userProfileTemplate = Handlebars.compile(userProfileSource),
    userProfilePlaceholder = document.getElementById('user-profile');

var oauthSource = document.getElementById('oauth-template').innerHTML,
    oauthTemplate = Handlebars.compile(oauthSource),
    oauthPlaceholder = document.getElementById('oauth');

var params = getHashParams();

var access_token = params.access_token,
    refresh_token = params.refresh_token,
    error = params.error;

if (error) {
    alert('There was an error during the authentication');
} else {
    if (access_token) {
    // render oauth info
    oauthPlaceholder.innerHTML = oauthTemplate({
        access_token: access_token,
        refresh_token: refresh_token
    });

    $.ajax({
        url: 'https://api.spotify.com/v1/me',
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function(response) {
            // console.log(response)
            userProfilePlaceholder.innerHTML = userProfileTemplate(response);

            $('#login').hide();
            $('#loggedin').show();
        }
    });

    $.ajax({
        url: `/recent?token=${access_token}`,
        type:'GET',
        success: (data) => {
            console.log(data) 
            populate_recently_played(data)
        }
    })

    // console.log(`'Authorization': 'Bearer ${access_token}'`)
    } else {
        // render initial screen
        $('#login').show();
        $('#loggedin').hide();
    }



    document.getElementById('obtain-new-token').addEventListener('click', function() {
    $.ajax({
        url: '/refresh_token',
        data: {
        'refresh_token': refresh_token
        }
    }).done(function(data) {
        access_token = data.access_token;
        oauthPlaceholder.innerHTML = oauthTemplate({
        access_token: access_token,
        refresh_token: refresh_token
        });
    });
    }, false);
}
})();

function populate_recently_played(data) {
    let tracks = data["items"]
    let out = "<ul>";
    // console.log(tracks)
    tracks.forEach(element => {
        out += `<li>name: ${element["track"]["name"]} | artist(s): `
        element["track"]["artists"].forEach(artist => {
            out += `<a href="https://open.spotify.com/artist/5WmX340gDNLIAyUcg4MzWN${artist["id"]}">${artist["name"]} </a>`;
        })
        
        out +=`| album: ${element["track"]["album"]["name"]}</li>`;
    });
    out += "</ul>";
    $("#recently-played").html(out)
    // console.log(out)
}

// function test() {
//     let token = "BQBSoI0zXAvoYR77oKHhtaJcBehdeRObozJ09Rx90ML8UmDb_rAVHnnwMddr9NbuHvEIrwxOKl9tozbiy62xJlLXe7Hi87OjDKaXoRWL3bhceJdMAr4_4Y4nR92kZHatuwv3dBchKPNU8-8TDRYrAVoc5Lb5jmoxoQxoRtX-is0g3w";
//     $.ajax({
//         url: `/test2?token=${token}`,
//         type:'GET',
//         success: (data) => {
//             console.log(data)
//         }
//     });
// }