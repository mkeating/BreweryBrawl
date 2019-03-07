const express = require('express');
const request = require('request');
const app = express();
const sass = require('node-sass-middleware');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Compile our sass
app.use(
    sass({
        /* Options */
        src: __dirname + '/src/sass',
        dest: __dirname + '/public/css',
        debug: true,
        outputStyle: 'compressed'
    })
);

app.use(express.static(path.join(__dirname, 'public')));

// render our index page
app.get('/', function(req, res) {
    res.render('index', { breweries: null, error: null });
});

//render graphql test page
app.get('/graphtest', function(req, res) {
  res.render('graphtest');
});

// fire up server
app.listen(process.env.PORT, function() {
    console.log('BreweryBrawl app listening on port ' + process.env.PORT + '!');
});

// call Untappd API and render index page
app.post('/', function(req, res) {
    let query = req.body.query;
    let url = `https://api.untappd.com/v4/search/brewery?client_id=${
        process.env.UNTAPPD_CLIENT_ID
    }&client_secret=${process.env.UNTAPPD_CLIENT_SECRET}&q=${query}`;

    request(url, function(err, response, body) {
        if (err) {
            res.render('index', {
                breweries: null,
                error: 'Error, please try again'
            });
            console.log('error', err);
        } else {
            let data = JSON.parse(body);
            let breweries = data.response;
            if (data.meta.code !== 200) {
                res.render('index', {
                    breweries: null,
                    error: `Error, please try again: ${data.meta.error_detail}`
                });
                console.log('error', err);
            } else {
                res.render('index', {
                    breweries: breweries.brewery.items,
                    error: null
                });
            }
        }
    });
});
