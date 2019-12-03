/* eslint-disable no-console */
import express from 'express';

const kafka = require('../../kafka/client');

const analyticsRouter = express.Router();

analyticsRouter.get('/mostViews', (req, res) => {
  console.log('Inside GET analytics most views');
  kafka.makeRequest(
    'analyticsTopic',
    {
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

analyticsRouter.get('/mostRetweets', (req, res) => {
  console.log('Inside GET analytics retweets');
  kafka.makeRequest(
    'analyticsTopic',
    {
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
analyticsRouter.get('/mostLikes', (req, res) => {
  console.log('Inside GET analytics most likes');
  kafka.makeRequest(
    'analyticsTopic',
    {
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

analyticsRouter.get('/numberOfTweets', (req, res) => {
  console.log('Inside GET analytics number of tweets');
  console.log('Request Body: ', req.params.userId);

  kafka.makeRequest(
    'analyticsTopic',
    {
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
