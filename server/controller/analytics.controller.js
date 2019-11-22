import mostLikes from '../services/analytic.services/getMostLikes';
import mostViews from '../services/analytic.services/getMostViews';
import mostRetweets from '../services/analytic.services/getMostRetweet';


const handleRequest = (payload, callback) => {
  switch (payload.action) {
    case 'ANALYTICS_RETWEET':
      mostRetweets.handleRequest(payload.body, callback);
      break;
    case 'ANALYTICS_LIKES':
      mostLikes.handleRequest(payload.body, callback);
      break;
    case 'ANALYTICS_VIEWS':
      mostViews.handleRequest(payload.userId, callback);
      break;
    default:
      break;
  }
};

// eslint-disable-next-line import/prefer-default-export
export { handleRequest };
