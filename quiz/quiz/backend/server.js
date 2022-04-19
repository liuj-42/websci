const path = require('path');
let express = require('express'); // Express web server framework
const BodyParser = require("body-parser");
const mongo = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const CONNECTION_URL = "mongodb+srv://jam:One23456@cluster0.rup6c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const fs = require('fs');

const app = express();

const DATABASE_NAME = "labs";
const COLLECTION_NAME = "quiz";

const PORT = 3000;

app.use(express.static(path.join(__dirname, "../dist/quiz")))
.use(BodyParser.json())



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


// GET      ---------------------------------

app.get('/mongo', (req, res) => {
    collection.find({}).toArray((error, result) => {
      if (error) { return res.status(500).send(error); }
      console.log(result)
      res.status(200).send(result);
    })
    // send entire db
  })
  
app.get('/mongo/:number', (req, res) => {
    const { number } = req.params
    collection.find({number: parseInt(number)}).toArray((error, result) => {
      if (error) { return res.status(500).send(error); }
      console.log(result);
      res.status(200).send(result)
    })
    // get db at specific number
})
  
  
// POST     ---------------------------------
app.post('/mongo', (req, res) => {
    const { data } = req.body;
    data = 				{"year": 2010,
    "val": 23,
    "title": "STARSTRUKK (feat. Katy Perry)"}
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
  
app.post('/mongo/:number', (req, res) => {
    // throw error
    res.status(400).send(result)
})
  
  
  
// PUT      ---------------------------------
app.put('/mongo', (req, res) => {
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
  
app.put('/mongo/:number', (req, res) => {
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
app.delete('/mongo', (req, res) => {
    // delete everything
    collection.deleteMany({})
      .then(result => {
        // if (error) { return res.status(500).send(error); }
        console.log(result)
        res.status(200).send(result);
      })
})
  
app.delete('/mongo/:number', (req, res) => {
    // delete specific document
    const { number } = req.params;
    collection.deleteOne({number: parseInt(number)})
      .then(result, error => {
        // if (error) { return res.status(500).send(error); }
        console.log(result)
        res.status(200).send(result);
      })
})



// genres that show up
// artists that show up
// popularity

app.get('/parse', (req, res) => {
    let rawdata = fs.readFileSync('data1.json');
    let data = JSON.parse(rawdata);
    let content = {};

    data.forEach(el => {
        if (!(el["year"] in Object.keys(content))) {
            content[el['year']] = [el['val']]
            console.log(content[el['year']])
        } else {
            content[el['year']].push(el['val'])
        }
    })
    data = content
    // console.log(data)
    // res.status(200).send(data)


    const filter = {number: 1};
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


app.get('/populate1', (req, res) => {
    let rawdata = fs.readFileSync('data1.json');
    let data = JSON.parse(rawdata)

    let dataParsed = []
    let count = 0;
    data.forEach(el => {
        if (count >= 100)  { return }

        temp = {year: el['top year'], val: el['val'], title: el['title']}
        dataParsed.push(temp)
        // if 
    })


    data = dataParsed;

    const filter = {number: 1};
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