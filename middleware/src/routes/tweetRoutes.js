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

export default tweetRouter;
