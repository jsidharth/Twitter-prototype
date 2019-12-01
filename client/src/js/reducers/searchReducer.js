import actionTypes from '../constants/index';

const initialState = {
  searchResults: {},
  searchSuggestions: {},
  searchMembersForList: {},
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_SUGGESTIONS:
      return {
        ...state,
        searchSuggestions: action.payload,
      };
    case actionTypes.SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload,
      };
    case actionTypes.SEARCH_MEMBERS_RESULTS:
      return {
        ...state,
        searchMembersForList: action.payload,
      };
    default:
      break;
  }
  return state;
};
export default searchReducer;
