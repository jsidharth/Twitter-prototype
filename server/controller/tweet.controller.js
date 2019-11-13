import getTweetFeed from '../services/tweet.services/tweetFeed';

const handleRequest = (payload, callback) => {
  switch (payload.action) {
    case 'TWEET_FEED':
      getTweetFeed.handleRequest(payload.userId, callback);
      break;
    default:
      break;
  }
};

// eslint-disable-next-line import/prefer-default-export
export { handleRequest };
