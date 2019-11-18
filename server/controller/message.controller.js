import getMessageThread from '../services/message.services/getMessageThread';

const handleRequest = (payload, callback) => {
  switch (payload.action) {
    case 'GET_MESSAGE_THREAD':
      getMessageThread.handleRequest(payload.userId, callback);
      break;
    default:
      break;
  }
};

// eslint-disable-next-line import/prefer-default-export
export { handleRequest };
