import composeMessage from '../services/message.services/composeMessage';
import getMessages from '../services/message.services/getMessages';

const handleRequest = (payload, callback) => {
  switch (payload.action) {
    case 'MESSAGE_COMPOSE':
      composeMessage.handleRequest(payload.body, callback);
      break;
    case 'MESSAGE_GET':
      getMessages.handleRequest(payload.body, callback);
      break;
    default:
      break;
  }
};

// eslint-disable-next-line import/prefer-default-export
export { handleRequest };
