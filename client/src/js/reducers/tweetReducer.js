import actionTypes from '../constants/index';

const initialState = {
  tweetPostedFlag: false,
  feed: [],
  currentTweet: {},
};

const tweetReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_TWEET:
      return { ...state, tweetPostedFlag: true };
    case actionTypes.TWEET_FEED:
      return { ...state, feed: action.payload };
    case actionTypes.TWEET_DETAILS:
      return { ...state, currentTweet: action.payload };
    default:
      break;
  }
  return state;
};

export default tweetReducer;
