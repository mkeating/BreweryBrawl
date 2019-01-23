const express = require('express');
const request = require('request');
const app = express();
const sass = require('node-sass-middleware');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Compile our sass
app.use(sass({
  /* Options */
  src: __dirname + '/sass',
  dest: __dirname + '/public/css',
  debug: true,
  outputStyle: 'compressed',
}));

app.use(express.static(path.join(__dirname, 'public')))

// render our index page
app.get('/', function (req, res) {
  res.render('index', {breweries: null, error: null});
});

// fire up server on port 3333
app.listen(3333, function () {
  console.log('Example app listening on port 3333!');
});

// call API and render index page
app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `https://api.openbrewerydb.org/breweries?by_city=${city}`;

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {breweries: null, error: 'Error, please try again'});
      console.log('error', err);
    } else {
      let breweries = JSON.parse(body);

      if(breweries[0] === undefined){
        res.render('index', {breweries: null, error: 'Error, please try again'});
      } else {
        let breweriesText = `Zee breweries of ${breweries[0].city}!`;

        res.render('index', {breweries: breweriesText, error: null});
        console.log('breweries:', breweries);
        console.log('breweriesText:', breweriesText);
      }
    }
  });
});
