import actionTypes from '../constants/index';

const initialState = {
  userDetails: '',
  profile: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_REGISTER:
      return { ...state, userDetails: action.payload };
    case actionTypes.USER_LOGIN:
      return { ...state, userDetails: action.payload };
    case actionTypes.GET_USER_PROFILE:
      return { ...state, profile: action.payload };
    default:
      break;
  }
  return state;
};

export default userReducer;
