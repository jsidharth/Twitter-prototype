/* eslint-disable no-console */
import express from 'express';

const kafka = require('../../kafka/client');

const listRouter = express.Router();

listRouter.post('/create', (req, res) => {
  console.log('Inside POST  Lists');
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

export default listRouter;
