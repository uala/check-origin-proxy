const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();

var corsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
};
app.use(cors(corsOptions));
app.use(require('morgan')('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function getAll(req,res) {
  const origin = req.get('origin');

  var path = req.path;
  if (path == "/json") {
    path = "/json/" + req.headers['x-forwarded-for'];
  }

  const HOST = process.env.HOST;
  const CREDENTIALS = process.env.CREDENTIALS;
  const ALLOWED_ORIGINS =process.env.ALLOWED_ORIGINS;

  const headers = {};
  if (CREDENTIALS) {
    headers['Authorization'] = 'Basic ' + Buffer.from(CREDENTIALS).toString('base64');
  }

  const ALLOWED_ORIGINS_LIST = ALLOWED_ORIGINS.split(",");
  if (origin && ALLOWED_ORIGINS_LIST.includes(origin)) {
    const response = await fetch( HOST + path, {method: 'GET', headers: headers});
    const result = await response.text();
    return res.status(response.status).send(result);
  }
  else {
    return res.status(401).send({error: "request not allowed", path: path})
  }
}

app.get('*', getAll)

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
