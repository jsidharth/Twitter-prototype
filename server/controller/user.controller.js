import register from '../services/user.services/register';

const handleRequest = (payload, callback) => {
  switch (payload.action) {
    case 1:
      register.handleRequest(payload.body, callback);
      break;
    default:
      break;
  }
};

export { handleRequest };
