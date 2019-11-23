/* eslint-disable no-console */
import express from 'express';

const kafka = require('../../kafka/client');

const analyticsRouter = express.Router();

analyticsRouter.get('/mostView/:userId', (req, res) => {
  console.log('Inside GET analytics most views');
  console.log('Request Body: ', req.params.userId);
  const { userId } = req.params;
  kafka.makeRequest(
    'analyticTopic',
    {
      userId,
      action: 'ANALYTICS_TWEET_VIEW',
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

analyticsRouter.get('/mostRetweet/:userId', (req, res) => {
  console.log('Inside GET analytics retweets');
  console.log('Request Body: ', req.params.userId);
  const { userId } = req.params;
  kafka.makeRequest(
    'analyticTopic',
    {
      userId,
      action: 'ANALYTIC_TWEET_RETWEET',
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
analyticsRouter.get('/mostLike/:userId', (req, res) => {
  console.log('Inside GET analytics most likes');
  console.log('Request Body: ', req.params.userId);
  const { userId } = req.params;
  kafka.makeRequest(
    'analyticTopic',
    {
      userId,
      action: 'ANALYTICS_TWEET_LIKE',
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
