/* eslint-disable no-underscore-dangle */
import {
  GiArcTriomphe
} from 'react-icons/gi';
import actionTypes from '../constants/index';

const initialState = {
  currentUser: {},
  profile: {},
  likedTweets: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_REGISTER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case actionTypes.USER_LOGIN:
      return {
        ...state,
        currentUser: action.payload,
      };
    case actionTypes.GET_USER_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case actionTypes.GET_LIKED_TWEETS:
      return {
        ...state,
        likedTweets: action.payload,
      };
    case actionTypes.UPDATE_SUBSCRIPTION:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          subscribedLists: action.payload,
        },
      };
    default:
      break;
  }
  return state;
};

export default userReducer;