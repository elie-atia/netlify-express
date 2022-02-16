'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const router = express.Router();

app.use(cors({ origin: true }));
app.use(
  cors({
    origin: '*',
    //origin: ['http://localhost:3000', 'https://www.binance.com/api','https://react-binance-app.web.app'],
  }),
);

router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js This server was deploy by elie!</h1>');
  res.end();
});
router.get('/test1', (req, res) => {
  const { signature, key, symbol, timestamp } = req.body;
  console.log(JSON.stringify(req.body));

  axios.get(`https://api.binance.com/api/v3/allOrders?symbol=${symbol}&timestamp=${timestamp}&signature=${signature}`
    , {
      headers: {
        'Content-Type': 'application/json',
        'X-MBX-APIKEY': key,
        'Host': 'api.binance.com',
      }
    }
  )
    .then(response => {
      console.log("AXIOS REQUEST WORKS FINE");
      res.status(200).json({
        data: JSON.parse(JSON.stringify(response.data)),
      });
    })
    .catch(error => {
      console.log("AXIOS GET ERROR: ", error);
      res.status(403).json({
        my_msg: "an error occurs in the axios request. Check the request and try again",
        error: error
      })
    });
});

router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));
router.post('/test1', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/test1', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
