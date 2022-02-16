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
router.get('/test1', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello. I have had this new endpoint. Enjoy !</h1>');
  res.end();
});

router.post('/test1', (req, res) => res.json( JSON.stringify(req.body)));
router.post('/test2', (req, res) => res.send(req.body));
router.post('/test3', (req, res) => res.send( JSON.stringify(req.body)));

app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);