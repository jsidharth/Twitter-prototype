// import the require dependencies
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import cors from 'cors';
import passport from 'passport';

import routes from './routes';

mongoose.Promise = Promise;
const app = express();

// load configurations for passport
require('../config/passport');

app.use(passport.initialize());
app.use(passport.session());

// use cors to allow cross origin resource sharing. Take value from .env file
app.use(
  cors({
    origin: 'http://serverloadbalancer-2041451976.us-east-1.elb.amazonaws.com:3000',
    credentials: true,
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Allow Access Control
// eslint-disable-next-line func-names
app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'http://serverloadbalancer-2041451976.us-east-1.elb.amazonaws.com:3000'
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// Routes
app.use('/', routes);

// start your server on port 3001
app.listen(3001);
console.log('Server Listening on port 3001');
module.exports = app;