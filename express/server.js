'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');


app.use(cors({ origin: true }));
app.use(
  cors({
    origin: '*',
    //origin: ['http://localhost:3000', 'https://www.binance.com/api','https://react-binance-app.web.app'],
  }),
);
app.use(bodyParser);

app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js This server was deploy by elie!</h1>');
  res.end();
});
app.post('/test1', (req, res) => {
  const { signature, key, symbol, timestamp } = req.body;
   //res.send(JSON.stringify(req.body));
   res.send('hello from post endpoint');

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



module.exports.handler = serverless(app);
