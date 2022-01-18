$(document).ready(function() {
    console.log("ready")
    cbs()
});

let cbs_url = "https://api.factmaven.com/xml-to-json/?xml=https://www.cbsnews.com/latest/rss/main";

async function xml_to_json( doc) {
    return $.ajax({
        method:"GET",
        url: doc,
        success: function (data) {
            return data;
        }
    })
}

let obj;
let arr;
let arr_global = [];
function cbs() { // 50 items
    
    $.when(xml_to_json(cbs_url)).then(function(data) {
        obj = data;
        // console.log(obj);
        arr = obj["rss"]["channel"]["item"];
        arr.forEach(element => {
            // title, description, link
            
            let em = `<li> <a href="${element['link']}"> <span class='title'>${element['title']}</span></a>
                <span class='content'>${element['description']}</span> </li>`
            $("#content").append(em);
            let item = ["cbs.png", em];
            arr_global.push(item);
        });
    })
    
    
}
