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
      }
      res.status(200).json(result);
    }
  );
});
userRouter.get('/details/(:data)', (req, res) => {
  console.log('Inside POST user register');
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
      }
      res.status(200).json(result);
    }
  );
});
userRouter.put('/details', (req, res) => {
  console.log('Inside POST user register');
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
      }
      res.status(200).json(result);
    }
  );
});
export default userRouter;
