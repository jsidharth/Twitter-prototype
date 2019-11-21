/* eslint-disable no-console */
import express from 'express';
// import passport from 'passport';

const kafka = require('../../kafka/client');

const listRouter = express.Router();

listRouter.post('/create', (req, res) => {
  console.log('Inside POST Create List');
  console.log('Request Body: ', req.body);
  kafka.makeRequest(
    'listTopic',
    {
      body: req.body,
      action: 'LIST_CREATE',
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

listRouter.get('/getLists/:userId', (req, res) => {
  console.log('Inside GET Lists');
  console.log('Request Body: ', req.params.body);
  kafka.makeRequest(
    'listTopic',
    {
      body: req.params.body,
      action: 'LIST_GET_LISTS',
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

listRouter.post('/subscribe', (req, res) => {
  console.log('Inside POST Subscribe to List');
  console.log('Request Body: ', req.body);
  kafka.makeRequest(
    'listTopic',
    {
      body: req.body,
      action: 'LIST_SUBSCRIBE',
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

export default listRouter;
