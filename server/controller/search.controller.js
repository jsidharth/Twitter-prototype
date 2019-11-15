import searchUser from '../services/search.services/searchUser';
import searchTopic from '../services/search.services/searchTopic';
import searchAll from '../services/search.services/searchAll';

const handleRequest = (payload, callback) => {
  switch (payload.action) {
    case 'SEARCH_USER':
      searchUser.handleRequest(payload.body, callback);
      break;
    case 'SEARCH_TOPIC':
      searchTopic.handleRequest(payload.body, callback);
      break;
    case 'SEARCH_ALL':
      searchAll.handleRequest(payload.body, callback);
      break;
    default:
      break;
  }
};

// eslint-disable-next-line import/prefer-default-export
export { handleRequest };
