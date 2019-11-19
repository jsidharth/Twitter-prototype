import getMessages from '../services/message.services/getMessages';
import composeMessage from '../services/message.services/composeMessage';

const handleRequest = (payload, callback) => {
  switch (payload.action) {
    case 'MESSAGE_GET_MESSAGE_THREAD':
      getMessages.handleRequest(payload.userId, callback);
      break;
    case 'MESSAGE_COMPOSE':
      composeMessage.handleRequest(payload.userId, callback);
      break;
    default:
      break;
  }
};

// eslint-disable-next-line import/prefer-default-export
export { handleRequest };
