import actionTypes from '../constants/index';

const initialState = {
  conversations: [],
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MESSAGE_GET:
      console.log(action.payload);
      return { ...state, conversations: action.payload };
    default:
      break;
  }
  return state;
};

export default messageReducer;
