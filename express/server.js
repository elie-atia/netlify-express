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
  const { signature, key, totalParams } = req.body;
//   res.status(200).json({
//     signature: signature,
//     key: key,
//     totalParams: totalParams,
//  });
  res.send(req.body);
});

app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);