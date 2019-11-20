/* eslint-disable no-console */
import express from 'express';
// import passport from 'passport';

const kafka = require('../../kafka/client');

const tweetRouter = express.Router();

tweetRouter.get('/feed/:userId', (req, res) => {
  console.log('Inside GET Tweet feed');
  console.log('Request Body: ', req.params.userId);
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
  console.log('Inside GET Tweet');
  console.log('Request Body: ', tweetId);
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

tweetRouter.delete('/delete/:tweetId', (req, res) => {
  const { tweetId } = req.params;
  console.log('Inside DELETE Tweet');
  console.log('Request Body: ', tweetId);
  kafka.makeRequest(
    'tweetTopic',
    {
      tweetId,
      action: 'TWEET_DELETE',
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

tweetRouter.post('/retweet', (req, res) => {
  console.log('Inside POST Retweet');
  console.log('Request Body: ', req.body);
  kafka.makeRequest(
    'tweetTopic',
    {
      body: req.body,
      action: 'TWEET_RETWEET',
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

tweetRouter.post('/bookmark', (req, res) => {
  console.log('Inside POST Bookmark Tweet');
  console.log('Request Body: ', req.body);
  kafka.makeRequest(
    'tweetTopic',
    {
      body: req.body,
      action: 'TWEET_BOOKMARK',
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

tweetRouter.get('/bookmark/:userId', (req, res) => {
  console.log('Inside GET Bookmarks');
  console.log('Request Body: ', req.params.userId);
  kafka.makeRequest(
    'tweetTopic',
    {
      body: req.params.userId,
      action: 'TWEET_GET_BOOKMARKS',
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
