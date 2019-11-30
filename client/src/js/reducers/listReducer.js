import actionTypes from '../constants/index';

const initialState = {
  lists: {},
  listDetails: {},
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LISTS:
      return {
        ...state,
        lists: action.payload,
      };
    case actionTypes.GET_LIST_DETAILS:
      return {
        ...state,
        listDetails: action.payload,
      };
    default:
      break;
  }
  return state;
};
export default listReducer;
