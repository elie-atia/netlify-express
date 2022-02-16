'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");

const router = express.Router();

app.use(cors({ origin: true }));
app.use(
  cors({
    origin: '*',
    //origin: ['http://localhost:3000', 'https://www.binance.com/api','https://react-binance-app.web.app'],
  }),
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js This server was deploy by elie!</h1>');
  res.end();
});
app.get('/test1', function (req, res) {
  const { signature, key, symbol, timestamp } = req.body;
   //res.send(JSON.stringify(req.body));
     res.send('Hello !');
  //     res.status(200).json({
  //       signature: signature,
  //       key: key,
  //       timestamp: timestamp,
  //       symbol: symbol,

  //     });


  // axios.get(`https://api.binance.com/api/v3/allOrders?symbol=${symbol}&timestamp=${timestamp}&signature=${signature}`
  //   , {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'X-MBX-APIKEY': key,
  //       'Host': 'api.binance.com',
  //     }
  //   }
  // )
  //   .then(response => {
  //     console.log("AXIOS REQUEST WORKS FINE");
  //     res.status(200).json({
  //       data: JSON.parse(JSON.stringify(response.data)),
  //     });
  //   })
  //   .catch(error => {
  //     console.log("AXIOS GET ERROR: ", error);
  //     res.status(403).json({
  //       my_msg: "an error occurs in the axios request. Check the request and try again",
  //       error: error
  //     })
  //   });
});

router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));
router.post('/test1', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
