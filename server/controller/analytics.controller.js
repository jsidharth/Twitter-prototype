import mostLikes from '../services/analytics.services/getMostLikes';
import mostViews from '../services/analytics.services/getMostViews';
import mostRetweets from '../services/analytics.services/getMostRetweet';

const handleRequest = (payload, callback) => {
  switch (payload.action) {
    case 'ANALYTICS_TWEET_RETWEETS':
      mostRetweets.handleRequest(payload.userId, callback);
      break;
    case 'ANALYTICS_TWEET_LIKES':
      mostLikes.handleRequest(payload.userId, callback);
      break;
    case 'ANALYTICS_TWEET_VIEWS':
      mostViews.handleRequest(payload.userId, callback);
      break;
    default:
      break;
  }
};

// eslint-disable-next-line import/prefer-default-export
export { handleRequest };
