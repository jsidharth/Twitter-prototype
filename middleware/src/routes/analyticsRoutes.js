/* eslint-disable no-console */
import express from 'express';

const kafka = require('../../kafka/client');

const analyticsRouter = express.Router();

analyticsRouter.get('/mostViews/:userId', (req, res) => {
  console.log('Inside GET analytics most views');
  console.log('Request Body: ', req.params.userId);
  const { userId } = req.params;
  kafka.makeRequest(
    'analyticsTopic',
    {
      userId,
      action: 'ANALYTICS_TWEET_VIEWS',
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

analyticsRouter.get('/mostRetweets/:userId', (req, res) => {
  console.log('Inside GET analytics retweets');
  console.log('Request Body: ', req.params.userId);
  const { userId } = req.params;
  kafka.makeRequest(
    'analyticsTopic',
    {
      userId,
      action: 'ANALYTICS_TWEET_RETWEETS',
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
analyticsRouter.get('/mostLikes/:userId', (req, res) => {
  console.log('Inside GET analytics most likes');
  console.log('Request Body: ', req.params.userId);
  const { userId } = req.params;
  kafka.makeRequest(
    'analyticsTopic',
    {
      userId,
      action: 'ANALYTICS_TWEET_LIKES',
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
analyticsRouter.get('/profileViewsPerDay/:userId', (req, res) => {
  console.log('Inside GET analytics profile views per day');
  console.log('Request Body: ', req.params.userId);
  const { userId } = req.params;
  kafka.makeRequest(
    'analyticsTopic',
    {
      userId,
      action: 'ANALYTICS_PROFILE_VIEWS_PER_DAY',
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

analyticsRouter.get('/numberOfTweets/:userId', (req, res) => {
  console.log('Inside GET analytics number of tweets');
  console.log('Request Body: ', req.params.userId);
  const { userId } = req.params;
  kafka.makeRequest(
    'analyticsTopic',
    {
      userId,
      action: 'ANALYTICS_NUMBER_OF_TWEETS',
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
