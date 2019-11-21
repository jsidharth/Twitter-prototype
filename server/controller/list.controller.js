import createList from '../services/list.services/createList';

const handleRequest = (payload, callback) => {
  switch (payload.action) {
    case 'LIST_CREATE':
      createList.handleRequest(payload.body, callback);
      break;
    default:
      break;
  }
};

// eslint-disable-next-line import/prefer-default-export
export { handleRequest };
