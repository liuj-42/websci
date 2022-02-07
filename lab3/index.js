const express = require('express');
const app = express();
const PORT = 3000;

app.use( express.json() )

app.listen(
    PORT,
    () => console.log(`alive on http://localhost:${PORT}`)
)

app.get('/history', (req, res) => {
    res.status(200).send({
        thing1: 'works',
        thing2: 'also works'
    })
});

app.post('/history/:id', (req, res) => {

   const { id } = req.params;
   const { logo } = req.body;

   if (!logo) {
       res.status(418).send( {message: "we need a logo!" })
   }

   res.send({
       something: `logo: ${logo} ID: ${id}`
   });

});

// /**
//  * Generates a random string containing numbers and letters
//  * @param  {number} length The length of the string
//  * @return {string} The generated string
//  */
//  var generateRandomString = function(length) {
//     var text = '';
//     var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
//     for (var i = 0; i < length; i++) {
//       text += possible.charAt(Math.floor(Math.random() * possible.length));
//     }
//     return text;
//   };
  

// let client_id = 'CLIENT_ID';
// let redirect_uri = `http://localhost:{PORT}/callback`;

// app.get('/login', (req, res) => {
//     let state = generateRandomString(16);
//     let scope = 'user-read-private user-read-email';

//     res.redirect('https://accounts.spotify.com/authorize?' +
//     querystring.stringify({
//       response_type: 'code',
//       client_id: client_id,
//       scope: scope,
//       redirect_uri: redirect_uri,
//       state: state
//     }));
// })