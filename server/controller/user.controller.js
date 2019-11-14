import register from '../services/user.services/register';
import login from '../services/user.services/login';
import getDetails from '../services/user.services/getDetails';
import putDetails from '../services/user.services/putDetails';
import deactivate from '../services/user.services/deactivate';

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
    default:
      break;
  }
};

// eslint-disable-next-line import/prefer-default-export
export { handleRequest };
