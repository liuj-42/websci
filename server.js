// var net = require('net');

// var sockets=[];

// var s = net.Server(function(socket) {
//    sockets.push(socket);

//    socket.on('data', function(d) {
//       for(var i=0; i<sockets.length;i++) {
//          if (sockets[i]==socket) continue;
//          sockets[i].write(d);
//       }
//    });
//    socket.on('end', function() {
//       var i=sockets.indexOf(socket);
//       sockets.splice(i,1);  
//    });
// });

// s.listen(8080);

const express = require('express'); // Express web server framework
const request = require('request'); // "Request" library
const app = express();
const PORT = 3000;

app.use(express.static(__dirname + '/public'))
    .use(express.json())


app.get('/', (req, res) => {
    res.render('/public/index.html');
});

app.post('/temperature', (req, res) => {
    const { zip } = req.body;
    const { key } = req.body;
    
    console.log(req.body)
    let options = {
        url: `http://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=${key}`,
        json: true
    };
    request.get(options, function (error, response, body) {
        console.log(`${body['lat']}  ${body['lon']}`)
        let loc = body['name'];
        let options = {
            url:`https://api.openweathermap.org/data/2.5/onecall?lat=${body['lat']}&lon=${body['lon']}&exclude=minutely,hourly,alerts&units=imperial&appid=${key}`,
            json: true
        }
        request.get(options, function(error, response, body) {
            res.status(200).send([body, loc]);
        })
    });


})

app.listen(PORT, () => {
    console.log(`Alive on http://localhost:${PORT}`)
})