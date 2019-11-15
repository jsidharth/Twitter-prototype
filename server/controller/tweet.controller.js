import getTweetFeed from '../services/tweet.services/tweetFeed';
import getTweetDetail from '../services/tweet.services/tweetDetail';

const handleRequest = (payload, callback) => {
  switch (payload.action) {
    case 'TWEET_FEED':
      getTweetFeed.handleRequest(payload.userId, callback);
      break;
    case 'TWEET_DETAIL':
      getTweetDetail.handleRequest(payload.tweetId, callback);
      break;
    default:
      break;
  }
};

// eslint-disable-next-line import/prefer-default-export
export { handleRequest };
