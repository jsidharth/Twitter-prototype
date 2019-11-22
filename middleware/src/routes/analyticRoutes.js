/* eslint-disable no-console */
import express from 'express';

const kafka = require('../../kafka/client');

const analyticsRouter = express.Router();

analyticsRouter.get('/analytic/retweet/:userId', (req, res) => {
  console.log('Inside GET analytics retweets');
  console.log('Request Body: ', req.params.userId);
  const { userId } = req.params;
  kafka.makeRequest(
    'analyticTopic',
    {
      userId,
      action: 'ANALYTIC_RETWEET',
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
analyticsRouter.get('/analytic/mostLike/:userId', (req, res) => {
  console.log('Inside GET analytics most likes');
  console.log('Request Body: ', req.params.userId);
  const { userId } = req.params;
  kafka.makeRequest(
    'analyticTopic',
    {
      userId,
      action: 'ANALYTICS_LIKE',
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
analyticsRouter.get('/analytic/mostView/:userId', (req, res) => {
  console.log('Inside GET analytics most views');
  console.log('Request Body: ', req.params.userId);
  const { userId } = req.params;
  kafka.makeRequest(
    'analyticTopic',
    {
      userId,
      action: 'ANALYTICS_VIEWS',
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

export default analyticsRouter;
