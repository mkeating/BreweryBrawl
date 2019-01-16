const express = require('express');
const app = express();
const sass = require('node-sass-middleware');
const path = require('path');

app.set('view engine', 'ejs');

app.use(sass({
  /* Options */
  src: __dirname,
  dest: path.join(__dirname, 'public'),
  debug: true,
  outputStyle: 'compressed'
}));

app.get('/', function (req, res) {
  res.render('index');
});

app.listen(3333, function () {
  console.log('Example app listening on port 3333!');
});
