/* eslint-disable no-underscore-dangle */
import actionTypes from '../constants/index';

const initialState = {
  currentUser:
    localStorage.getItem('currentUser') === null
      ? {}
      : JSON.parse(localStorage.getItem('currentUser')),
  profile: {},
  likedTweets: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_REGISTER:
      return { ...state, currentUser: action.payload };
    case actionTypes.USER_LOGIN:
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
      return { ...state, currentUser: action.payload };
    case actionTypes.GET_USER_PROFILE:
      return { ...state, profile: action.payload };
    case actionTypes.GET_LIKED_TWEETS:
      return { ...state, likedTweets: action.payload };
    default:
      break;
  }
  return state;
};

export default userReducer;
