import express from 'express';
// import passport from 'passport';

const kafka = require('../../kafka/client');

const tweetRouter = express.Router();

tweetRouter.get('/feed/:userId', (req, res) => {
  const { userId } = req.params;
  kafka.makeRequest(
    'tweetTopic',
    {
      userId,
      action: 'TWEET_FEED',
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

tweetRouter.post('/post', (req, res) => {
  console.log('Inside POST Tweet');
  console.log('Request Body: ', req.body);
  kafka.makeRequest(
    'tweetTopic',
    {
      body: req.body,
      action: 'TWEET_POST',
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

tweetRouter.get('/detail/:tweetId', (req, res) => {
  const { tweetId } = req.params;
  kafka.makeRequest(
    'tweetTopic',
    {
      tweetId,
      action: 'TWEET_DETAIL',
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

export default tweetRouter;
