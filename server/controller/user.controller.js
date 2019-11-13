import register from '../services/user.services/register';
import login from '../services/user.services/login';

const handleRequest = (payload, callback) => {
  switch (payload.action) {
    case 'USER_REGISTER':
      register.handleRequest(payload.body, callback);
      break;
    case 'USER_LOGIN':
      login.handleRequest(payload.body, callback);
      break;
    default:
      break;
  }
};

// eslint-disable-next-line import/prefer-default-export
export { handleRequest };
