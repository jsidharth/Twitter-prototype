import mostLikes from '../services/analytics.services/getMostLikes';
import mostViews from '../services/analytics.services/getMostViews';
import mostRetweets from '../services/analytics.services/getMostRetweets';
import profileViews from '../services/analytics.services/viewsPerDay';
import numberOfTweets from '../services/analytics.services/numberOfTweets';

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
    case 'ANALYTICS_PROFILE_VIEWS_PER_DAY':
      profileViews.handleRequest(payload.userId, callback);
      break;
    case 'ANALYTICS_NUMBER_OF_TWEETS':
      numberOfTweets.handleRequest(payload.userId, callback);
      break;
    default:
      break;
  }
};

// eslint-disable-next-line import/prefer-default-export
export { handleRequest };
