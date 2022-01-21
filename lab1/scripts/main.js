$(document).ready(function() {
    $.when(cnet()).done( function() {
        setTimeout(news_ticker, 1000);
    })
    
});

function news_ticker() {
    // console.log('doing stuff')
    $("#content").bootstrapNews({
        newsPerPage: 5,
        autoplay: true,
        pauseOnHover: true,
        direction: 'up',
        newsTickerInterval: 3000,
    });
}

let cnet_urls = ["https://www.cnet.com/rss/news/", 
                 "https://www.cnet.com/rss/reviews/", 
                 "https://www.cnet.com/rss/how-to/", 
                 "https://www.cnet.com/rss/crave/",
                 "https://www.cnet.com/rss/android-update/",
                 "https://www.cnet.com/rss/gaming/",
                 "https://www.cnet.com/rss/cheapskate/",
                 "https://www.cnet.com/rss/most-popular-products/"];

async function xml_to_json( doc) {
    return $.ajax({
        method:"GET",
        url: doc,
        success: function (data) {
            // console.log(data)
            return data;
        }, error: function (error) {
            return "error";
        }
    })
}

async function local_json() {
    return $.ajax({
        method:"GET",
        url:"data.json",
        success: function(data) {
            return data;
        }, error: function (error) {
            alert(error);
            return error;
        }
    })
}
// let temp;
// function fallback_test() { // just for debugging
//     $("#content").empty();
//     // fallback to local json file
//     $.when(local_json()).then(function(data) {
//         temp = data;
//         fallback(data);
//     });
// }

function fallback(data) {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            console.log(data[i]);
            let article = data[i][j];
            let em = `<li class="news-item">
                        <a href="${article['link']}" class="title"> <span class='title'>${article['title']}</span></a>
                        <table>
                            <tr>
                                <td><img src="${article['thumbnail']['url']}" alt="article thumbnail" class="img-circle" height="60"/></td>
                                <td>${article['description']}</td>
                            </tr>
                        </table>
                      </li>`
            $("#content").append(em);
        }
    }
} 

let obj;
let arr;
let arr_global = [];
function cnet() {
    // console.log('cnet begin')
    cnet_urls.forEach(url => {
        $.when(xml_to_json("https://api.factmaven.com/xml-to-json/?xml=" + url)).then(function(data) {
            if (data === "error") {
                //clear everything that is in the content tag at the moment
                $("#content").empty();
                // fallback to local json file
                $.when(local_json()).then(function(data) {
                    fallback(data);
                });
                return; // if one failed then just use the local file and then be done with that
            }
            // title, description, link, thumbnail
            obj = data;
            arr = obj["rss"]["channel"]["item"];
            arr.forEach(element => {
                let em = `<li class="news-item">
                            <a href="${element['link']}" class="title"> <span class='title'>${element['title']}</span></a>
                            <table>
                                <tr>
                                    <td><img src="${element['thumbnail']['url']}" alt="article thumbnail" class="img-circle" height="60"/></td>
                                    <td>${element['description']}</td>
                                </tr>
                            </table>
                          </li>`
                
                $("#content").append(em);
                
            });
            arr_global.push(arr);
        });
    });
    // console.log('cnet finish')
}

