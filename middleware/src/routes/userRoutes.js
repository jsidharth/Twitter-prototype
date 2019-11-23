import express from 'express';
import passport from 'passport';

const kafka = require('../../kafka/client');

const userRouter = express.Router();

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
  kafka.makeRequest(
    'userTopic',
    {
      userId: req.params.data,
      action: 'USER_GET_DETAILS',
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

userRouter.get('/like/(:userId)', (req, res) => {
  const { userId } = req.params;
  console.log('Inside get tweets liked by user');
  console.log('Request Body: ', userId);
  kafka.makeRequest(
    'userTopic',
    {
      body: userId,
      action: 'USER_GET_TWEETS_LIKED',
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
