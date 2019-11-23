import register from '../services/user.services/register';
import login from '../services/user.services/login';
import getDetails from '../services/user.services/getDetails';
import putDetails from '../services/user.services/putDetails';
import deactivate from '../services/user.services/deactivate';
import followUser from '../services/user.services/followUser';
import unfollowUser from '../services/user.services/unfollowUser';
import getTweetsLiked from '../services/user.services/getTweetsLiked';

const handleRequest = (payload, callback) => {
  switch (payload.action) {
    case 'USER_REGISTER':
      register.handleRequest(payload.body, callback);
      break;
    case 'USER_LOGIN':
      login.handleRequest(payload.body, callback);
      break;
    case 'USER_GET_DETAILS':
      getDetails.handleRequest(payload.userId, callback);
      break;
    case 'USER_PUT_DETAILS':
      putDetails.handleRequest(payload.body, callback);
      break;
    case 'USER_DEACTIVATE':
      deactivate.handleRequest(payload.body, callback);
      break;
    case 'USER_FOLLOW':
      followUser.handleRequest(payload.body, callback);
      break;
    case 'USER_UNFOLLOW':
      unfollowUser.handleRequest(payload.body, callback);
      break;
    case 'USER_GET_TWEETS_LIKED':
      getTweetsLiked.handleRequest(payload.body, callback);
      break;
    default:
      break;
  }
};

// eslint-disable-next-line import/prefer-default-export
export { handleRequest };
