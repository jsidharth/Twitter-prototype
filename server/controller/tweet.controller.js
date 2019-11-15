import getTweetFeed from '../services/tweet.services/tweetFeed';
import postTweet from '../services/tweet.services/postTweet';

const handleRequest = (payload, callback) => {
  switch (payload.action) {
    case 'TWEET_FEED':
      getTweetFeed.handleRequest(payload.userId, callback);
      break;
    case 'TWEET_POST':
      postTweet.handleRequest(payload.body, callback);
      break;
    default:
      break;
  }
};

// eslint-disable-next-line import/prefer-default-export
export { handleRequest };
