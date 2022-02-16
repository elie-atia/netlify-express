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


router.post('/ordersHistory1', (req, res) => {
  const { signature } = req.body;
  res.send(`The signature of the request is:${signature}`);
});
router.post('/ordersHistory2', (req, res) => {
  const { signature } = json(req.body);
  res.send(`The signature of the request is:${signature}`);
});
router.post('/ordersHistory3', (req, res) => {
  const { signature } = JSON.stringify(req.body);
  res.send(`The signature of the request is:${signature}`);
});


app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);