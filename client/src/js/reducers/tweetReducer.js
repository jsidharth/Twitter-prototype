import actionTypes from '../constants/index';

const initialState = {
  tweetPostedFlag: false,
  feed: [],
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_TWEET:
      return { ...state, tweetPostedFlag: true };
    case actionTypes.TWEET_FEED:
      return { ...state, feed: action.payload };
    default:
      break;
  }
  return state;
};

export default imageReducer;
