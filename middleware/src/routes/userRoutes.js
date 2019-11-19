import express from 'express';
import passport from 'passport';
import redis from 'redis';
import Promise from 'bluebird';

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const client = redis.createClient(6379);
const kafka = require('../../kafka/client');

const userRouter = express.Router();

client.on('error', err => {
  console.log('Error ', err);
});

userRouter.post('/register', passport.authenticate('register'), (req, res) => {
  console.log('Inside POST user register');
  console.log('Request Body: ', req.body);
  kafka.makeRequest(
    'userTopic',
    {
      body: req.body,
      action: 'USER_REGISTER',
    },
    (err, result) => {
      if (err) {
        console.log('Error ', err);
        res.status(500).json({
          message: err.message,
        });
      } else {
        res.status(200).json(result);
      }
    }
  );
});

userRouter.post('/login', passport.authenticate('login'), (req, res) => {
  console.log('Inside POST user Login');
  console.log('Request Body: ', req.body);
  kafka.makeRequest(
    'userTopic',
    {
      body: req.body,
      action: 'USER_LOGIN',
    },
    (err, result) => {
      if (err) {
        console.log('Error ', err);
        res.status(500).json({
          message: err.message,
        });
      } else {
        res.status(200).json(result);
      }
    }
  );
});

userRouter.get('/details/(:data)', (req, res) => {
  console.log('Inside get user details');
  console.log('Request Body: ', req.params.data);
  const { data } = req.params;
  // Check if user is in redis cache
  return client.getAsync(data).then(cacheResult => {
    // If found in cache return
    if (cacheResult) {
      res.status(200).json(JSON.parse(cacheResult));
    } else {
      // Fetch details from database
      kafka.makeRequest(
        'userTopic',
        {
          userId: data,
          action: 'USER_GET_DETAILS',
        },
        (err, result) => {
          if (err) {
            console.log('Error ', err);
            res.status(500).json({
              message: err.message,
            });
          } else {
            // store in cache with a timeout of 3600 sec and respond
            return client.setexAsync(data, 3600, JSON.stringify(result)).then(() => {
              res.status(200).json(result);
            });
          }
        }
      );
    }
  });
});

userRouter.put('/details', (req, res) => {
  console.log('Inside put user details');
  console.log('Request Body: ', req.body);
  kafka.makeRequest(
    'userTopic',
    {
      body: req.body,
      action: 'USER_PUT_DETAILS',
    },
    (err, result) => {
      if (err) {
        console.log('Error ', err);
        res.status(500).json({
          message: err.message,
        });
      } else {
        res.status(200).json(result);
      }
    }
  );
});

userRouter.put('/deactivate/(:data)', (req, res) => {
  console.log('Inside put user deactivate');
  console.log('Request Body: ', req.body);
  kafka.makeRequest(
    'userTopic',
    {
      body: req.params.data,
      action: 'USER_DEACTIVATE',
    },
    (err, result) => {
      if (err) {
        console.log('Error ', err);
        res.status(500).json({
          message: err.message,
        });
      } else {
        res.status(200).json(result);
      }
    }
  );
});

userRouter.post('/follow', (req, res) => {
  kafka.makeRequest(
    'userTopic',
    {
      body: req.body,
      action: 'USER_FOLLOW',
    },
    (err, result) => {
      if (err) {
        console.log('Error ', err);
        res.status(500).json({
          message: err.message,
        });
      } else {
        res.status(200).json(result);
      }
    }
  );
});

userRouter.post('/unfollow', (req, res) => {
  kafka.makeRequest(
    'userTopic',
    {
      body: req.body,
      action: 'USER_UNFOLLOW',
    },
    (err, result) => {
      if (err) {
        console.log('Error ', err);
        res.status(500).json({
          message: err.message,
        });
      } else {
        res.status(200).json(result);
      }
    }
  );
});

export default userRouter;
