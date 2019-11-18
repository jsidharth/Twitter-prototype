import actionTypes from '../constants/index';

const initialState = {
  userDetails: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_REGISTER:
      console.log(action.payload);
      return { ...state, userDetails: action.payload };
    case actionTypes.USER_LOGIN:
      console.log(action.payload);
      return { ...state, userDetails: action.payload };
    default:
      break;
  }
  return state;
};

export default userReducer;
