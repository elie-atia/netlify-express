const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();

app.use(bodyParser.json());

router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js This server was deploy by elie!</h1>');
  res.end();
});

router.post('/ordersHistory', (req, res) => {
  const body = req.body;
  // let pairs = body.split('&');
  // let result = {};
  // pairs.forEach(function (pair) {
  //   pair = pair.split('=');
  //   result[pair[0]] = decodeURIComponent(pair[1] || '');
  // });
  res.send(`The request of the body is: ${body}`);
});

app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);