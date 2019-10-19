const { createServer } = require('http');
const express = require('express');
const app = express();
const helmet = require('helmet');
const fileHandler = require('fs');
const path = require('path');

const axios = require('axios');

let favouritesArray = [];

// get data from iTunes api based on user input submitted from the front-end
app.get('/search/*/*', function (req, res, next) {
  axios.get(`https://itunes.apple.com/search?term=${req.params[0]}&media=${req.params[1]}`)
    .then((response) => {
      if (response.data.results.length == 0) {
        res.send('Nothing found');
      } else {
        res.send(response.data.results);
      }
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

// get info on favourites from json file
app.get('/favourites', (req, res) => {
  fileHandler.readFile('favourites.json', (err, data) => {
    // parse data in json file
    favouritesArray = JSON.parse(data);
    if (err) res.send('File not found. First post to create file');
    else res.send(favouritesArray);
  });
});

// add new favourite item to favourites.json
app.post('/search/:imageurl/:type/:trackname/:moreinfourl/:trackid', (req, res) => {
  // read contents of favourites.json
  fileHandler.readFile('favourites.json', (err, data) => {
    // parse data in favourites.json
    favouritesArray = JSON.parse(data);
    // push new object to favourites.json
    favouritesArray.push({
      "imageUrl": `${req.params.imageurl}`,
      "type": `${req.params.type}`,
      "trackName": `${req.params.trackname}`,
      "moreInfoUrl": `${req.params.moreinfourl}`,
      "trackId": `${req.params.trackid}`
    });

    // rewrite favourites.json file based on current favouritesArray
    fileHandler.writeFile('favourites.json', JSON.stringify(favouritesArray), (err) => {
      if (err) throw err;
      else res.send(favouritesArray);
    });
  });
  console.log(favouritesArray);
});

// delete item based on id from api
app.delete('/favourites/:id', (req, res) => {
  // read contens of api
  fileHandler.readFile('favourites.json', (err, data) => {
    // parse data in api
    favouritesArray = JSON.parse(data);
    // get index of object to be deleted from array based on item id number, then delete that object
    favouritesArray.splice(req.params.id, 1);
    // make sure the objects have sequential id numbers in the array
    favouritesArray.forEach((item, index) => {
      item.id = index + 1;
    });

    // recreate api file based on favouritesArray[]
    fileHandler.writeFile('favourites.json', JSON.stringify(favouritesArray), (err) => {
      if (err) throw err;
      else res.send(favouritesArray);
    });
  });
});

// app.use(express.static('public'));
app.use(helmet());

app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send('Whoops! Something Broke...')
});

const PORT = process.env.PORT || 8080
const server = createServer(app);

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
};