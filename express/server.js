const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const axios = require('axios');
const cors = require('cors');

app.use(bodyParser.json());
// Automatically allow cross-origin requests
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

router.post('/ordersHistory', (req, res) => {
  const { signature, key, symbol, timestamp } = req.query;

  axios.get(`https://api.binance.com/api/v3/allOrders?symbol=${symbol}&timestamp=${timestamp}&signature=${signature}`
    , {
      headers: {
        'Content-Type': 'application/json',
        'X-MBX-APIKEY': key,
      }
    }
  ).then(response => {
    res.status(200).json({
      data: JSON.parse(JSON.stringify(response.data)),
    });
    //res.send("axios succes");
  })
    .catch(error => {
      // res.status(403).json({
      //   my_msg: "an error occurs in the axios request. Check the request and try again",
      //   error: error
      // })
      res.send(`axios failed: ${error}. The parameters are: signature: ${signature} key: ${key} symbol: ${symbol} timestamp: ${timestamp}`);
    });
});

app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);