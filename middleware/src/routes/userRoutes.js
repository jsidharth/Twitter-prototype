/* eslint-disable no-param-reassign */
import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Users } from '../../config/sequelize';
import jwtSecret from '../../config/jwtConfig';

const kafka = require('../../kafka/client');

const userRouter = express.Router();

userRouter.post('/register', passport.authenticate('register'), async (req, res) => {
  console.log('Inside POST user register');
  console.log('Request Body: ', req.body);
  kafka.makeRequest(
    'userTopic',
    {
      body: req.body,
      action: 'USER_REGISTER',
    },
    async (err, result) => {
      if (err) {
        console.log('Error ', err);
        res.status(500).json({
          message: err.message,
        });
      } else {
        const user = await Users.findOne({
          where: {
            email: result.email,
          },
        });
        const token = jwt.sign({ id: user.id }, jwtSecret.secret);
        result.token = token;
        res.status(200).json(result);
      }
    }
  );
});

userRouter.post('/login', passport.authenticate('login'), async (req, res) => {
  console.log('Inside POST user Login');
  console.log('Request Body: ', req.body);
  kafka.makeRequest(
    'userTopic',
    {
      body: req.body,
      action: 'USER_LOGIN',
    },
    async (err, result) => {
      if (err) {
        console.log('Error ', err);
        res.status(500).json({
          message: err.message,
        });
      } else {
        const user = await Users.findOne({
          where: {
            email: result.email,
          },
        });
        const token = jwt.sign({ id: user.id }, jwtSecret.secret);
        result.token = token;
        res.status(200).json(result);
      }
    }
  );
});

userRouter.get('/details/:userId', (req, res) => {
  console.log('Inside get user details');
  console.log('Request Body: ', req.params.data);
  kafka.makeRequest(
    'userTopic',
    {
      userId: req.params.userId,
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

userRouter.put('/deactivate/(:userId)', (req, res) => {
  console.log('Inside put user deactivate');
  console.log('Request Body: ', req.params.userId);
  kafka.makeRequest(
    'userTopic',
    {
      body: req.params.userId,
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
