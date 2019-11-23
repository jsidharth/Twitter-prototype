import mostLikes from '../services/analytic.services/getMostLikes';
import mostViews from '../services/analytic.services/getMostViews';
import mostRetweets from '../services/analytic.services/getMostRetweet';


const handleRequest = (payload, callback) => {
  switch (payload.action) {
    case 'ANALYTIC_TWEET_RETWEET':
      mostRetweets.handleRequest(payload.userId, callback);
      break;
    case 'ANALYTICS_TWEET_LIKE':
      mostLikes.handleRequest(payload.userId, callback);
      break;
    case 'ANALYTICS_TWEET_VIEW':
      mostViews.handleRequest(payload.userId, callback);
      break;
    default:
      break;
  }
};

// eslint-disable-next-line import/prefer-default-export
export { handleRequest };
