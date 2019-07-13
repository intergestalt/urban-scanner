const express = require('express');
const bodyParser = require('body-parser');
const storage = require('./storage.js')
const core = require('./core.js')

port = process.env.PORT || 80

// create express server
var app = express()

// set up body parser
app.use(bodyParser.json());

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// serve static files
app.use(express.static('../web-dev/build'))

// serve data
app.get('/data/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  console.log("get data request", storage.getData())
  res.send(JSON.stringify(storage.getData()));
});
app.post('/data/', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  console.log("received data", req.body)
  storage.save(req.body)
  res.end(JSON.stringify({status: "OK"}))
});

// serve api
app.post('/code/', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  console.log("received code", req.body)
  const result = core.inputCode(req.body.code) || {}
  res.end(JSON.stringify(result))
});

app.listen(port, function () {
  console.log('API listening on port ' + port);
});
