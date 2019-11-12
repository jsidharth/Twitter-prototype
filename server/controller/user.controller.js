import register from '../services/user.services/register';

const handleRequest = (payload, callback) => {
  switch (payload.action) {
    case 'USER_REGISTER':
      register.handleRequest(payload.body, callback);
      break;
    default:
      break;
  }
};

export { handleRequest };
