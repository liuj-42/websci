/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */


const path = require('path');
let express = require('express'); // Express web server framework
let request = require('request'); // "Request" library
let cors = require('cors');
let querystring = require('querystring');
let cookieParser = require('cookie-parser');
const BodyParser = require("body-parser");
const mongo = require("mongodb")
const MongoClient = require("mongodb").MongoClient;
const CONNECTION_URL = "mongodb+srv://jam:One23456@cluster0.rup6c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const DATABASE_NAME = "lab5";
const COLLECTION_NAME = "db";

let client_id = 'd61ccebb867543cea460e6a08bdac648'; // Your client id
let client_secret = 'fcab6b232f724cf084d7864f1af8c8aa'; // Your secret
let redirect = "http://localhost:3000/callback"; // Your redirect uri
const PORT = 3000;
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
let generateRandomString = function(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

let stateKey = 'spotify_auth_state';

let app = express();

app.use(express.static(__dirname + '/public'))
    .use(express.static(path.join(__dirname, '../frontend/dist/frontend')))
    .use(cors())
    .use(cookieParser())
    // .use(express.json())
    .use(BodyParser.json())
    .use(BodyParser.urlencoded({ extended: true }));
let database, collection;


app.listen(PORT, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection(COLLECTION_NAME);
        console.log("Connected to " + DATABASE_NAME);
        console.log(`server up on http://localhost:${PORT}`);
    });
});

app.get('/', function(req, res) {
    res.status(200).send("hello");
});

app.get('/api', function(req, res) {
    res.json({ 'test': 'api' });
})


app.get('/refresh_token', function(req, res) {

    // requesting access token from refresh token
    let refresh_token = req.query.refresh_token;
    let authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            let access_token = body.access_token;
            res.send({
                'access_token': access_token,
                //  'thing':body
            });
        }
    });
});

app.get('/recent', (req, res) => {
    //  console.log(req.body)
    const token = req.query.token;

    let options = {
        url: 'https://api.spotify.com/v1/me/player/recently-played',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        json: true
    };
    request.get(options, function(error, response, body) {
        // console.log(body);
        res.status(200).send(body);
    });

});



app.get('/login', function(req, res) {
    console.log("logging in")
    let state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    let scope = 'ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-private user-read-email user-follow-modify user-follow-read user-library-modify user-library-read streaming app-remote-control user-read-playback-position user-top-read user-read-recently-played playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect,
            state: state
        }));
});

app.get('/callback', function(req, res) {

    // your application requests refresh and access tokens
    // after checking the state parameter

    let code = req.query.code || null;
    let state = req.query.state || null;
    let storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        res.clearCookie(stateKey);
        let authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {

                let access_token = body.access_token,
                    refresh_token = body.refresh_token;

                let options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    },
                    json: true
                };

                // use the access token to access the Spotify Web API
                request.get(options, function(error, response, body) {
                    console.log(body);
                });
                // we can also pass the token to the browser to make requests from there
                res.redirect('/?' +
                    querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token,
                        logged_in: true
                    }));
            } else {
                res.redirect('/?' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
    }
});

app.get("/info", (req, res) => {
    const token = req.query.token;
    let options = {
        url: "https://api.spotify.com/v1/me",
        headers: {
            'Authorization': 'Bearer ' + token
        },
        json: true
    };
    request.get(options, function(error, response, body) {
        // console.log(body);
        res.status(200).send(body);
    });

})

app.get("/check-like", (req, res) => {
    const token = req.query.token;
    const id = req.query.id;
    let options = {
        url: `https://api.spotify.com/v1/me/tracks/contains?ids=${id}`,
        headers: {
            'Authorization': 'Bearer ' + token
        },
        json: true
    };
    request.get(options, function(error, response, body) {
        res.status(200).send(body);
    })
})



// GET      ---------------------------------

app.get('/db', (req, res) => {
    collection.find({}).toArray((error, result) => {
      if (error) { return res.status(500).send(error); }
      console.log(result)
      res.status(200).send(result);
    })
    // send entire db
  })
  
app.get('/db/:number', (req, res) => {
    const { number } = req.params
    collection.find({number: parseInt(number)}).toArray((error, result) => {
      if (error) { return res.status(500).send(error); }
      console.log(result);
      res.status(200).send(result)
    })
    // get db at specific number
})
  
  
// POST     ---------------------------------
app.post('/db', (req, res) => {
    const { data } = req.body;
    console.log(req.body)
    collection.countDocuments()
      .then( result => {
        console.log(result);
        collection.insertOne({number: result + 1, data: data})
          .then(result => {
            // if (error) { return res.status(500).send(error); }
            return res.status(200).send(result)
          });
      });
    // add new document
    // document to be added is in the body
})
  
app.post('/db/:number', (req, res) => {
    // throw error
    res.status(400).send(result)
})
  
  
  
// PUT      ---------------------------------
app.put('/db', (req, res) => {
    // update everything
    const { data } = req.body;
    const filter = {};
    const replace = {$set: {data: data}}
    const options = {upsert: false};
  
    collection.updateMany(filter, replace, options)
      .then(result => {
        // if (error) { return res.status(500).send(error); }
        if (result["modifiedCount"] == 0) {
          res.status(400).send(result);
        } else {
          res.status(200).send(result);
        }
      })
})
  
app.put('/db/:number', (req, res) => {
    // update specific thing
    const { number } = req.params;
    const { data } = req.body;
    const filter = {number: parseInt(number)};
    const replace = {$set: {data: data}};
    const options = {upsert: false};
  
    collection.updateOne(filter, replace, options)
      .then(result => {
        // if (error) { return res.status(500).send(error); }
        console.log(result)
        if (result["modifiedCount"] == 0) {
          res.status(400).send(result);
        } else {
          res.status(200).send(result);
        }
      })
  
})
  
// DELETE   ---------------------------------
app.delete('/db', (req, res) => {
    // delete everything
    collection.deleteMany({})
      .then(result => {
        // if (error) { return res.status(500).send(error); }
        console.log(result)
        res.status(200).send(result);
      })
})
  
app.delete('/db/:number', (req, res) => {
    // delete specific document
    const { number } = req.params;
    collection.deleteOne({number: parseInt(number)})
      .then(result, error => {
        // if (error) { return res.status(500).send(error); }
        console.log(result)
        res.status(200).send(result);
      })
})
  