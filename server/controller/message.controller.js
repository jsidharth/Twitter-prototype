import getMessages from '../services/message.services/getMessages';
import composeMessage from '../services/message.services/composeMessage';

const handleRequest = (payload, callback) => {
  switch (payload.action) {
    case 'GET_MESSAGES':
      getMessages.handleRequest(payload.userId, callback);
      break;
    case 'COMPOSE_MESSAGE':
      composeMessage.handleRequest(payload.userId, callback);
      break;
    default:
      break;
  }
};

// eslint-disable-next-line import/prefer-default-export
export { handleRequest };
