import register from '../services/user.services/register';
import getDetails from '../services/user.services/getDetails';
import putDetails from '../services/user.services/putDetails';

const handleRequest = (payload, callback) => {
  switch (payload.action) {
    case 'USER_REGISTER':
      register.handleRequest(payload.body, callback);
      break;
    case 'USER_GET_DETAILS':
      getDetails.handleRequest(payload.userId, callback);
      break;
    case 'USER_PUT_DETAILS':
      putDetails.handleRequest(payload.body, callback);
      break;
    default:
      break;
  }
};

export { handleRequest };
