import createList from '../services/list.services/createList';
import getLists from '../services/list.services/getLists';
import subscribeList from '../services/list.services/subscribeList';
import unsubscribeList from '../services/list.services/unsubscribeList';
import getListDetails from '../services/list.services/getListDetails';

const handleRequest = (payload, callback) => {
  switch (payload.action) {
    case 'LIST_CREATE':
      createList.handleRequest(payload.body, callback);
      break;

    case 'LIST_GET_LISTS':
      getLists.handleRequest(payload.body, callback);
      break;

    case 'LIST_SUBSCRIBE':
      subscribeList.handleRequest(payload.body, callback);
      break;
    case 'LIST_UNSUBSCRIBE':
      unsubscribeList.handleRequest(payload.body, callback);
      break;
    case 'LIST_GET_LIST_DETAILS':
      getListDetails.handleRequest(payload.body, callback);
      break;
    default:
      break;
  }
};

// eslint-disable-next-line import/prefer-default-export
export { handleRequest };
