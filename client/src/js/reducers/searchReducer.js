import actionTypes from '../constants/index';

const initialState = {
  searchResults: {},
  searchSuggestions: [],
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
    default:
      break;
  }
  return state;
};
export default searchReducer;
