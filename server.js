const express = require('express');
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
  res.render('index');
});

app.listen(3333, function () {
  console.log('Example app listening on port 3333!');
});

app.post('/', function (req, res) {
  res.render('index');
  console.log(req.body.city);
});