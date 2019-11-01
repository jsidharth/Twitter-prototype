//import the require dependencies
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Promise from 'bluebird';
mongoose.Promise = Promise;
import cors from 'cors';
const app = express();

//use cors to allow cross origin resource sharing. Take value from .env file
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
  );
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//start your server on port 3001
app.listen(3001);
console.log('Server Listening on port 3001');
module.exports = app;
