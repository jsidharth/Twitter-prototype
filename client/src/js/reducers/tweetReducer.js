import _ from 'lodash';
import actionTypes from '../constants/index';

const initialState = {
  tweetPostedFlag: false,
  feed: [],
  currentTweet: {},
  bookmarkedTweets: [],
  tweetDeletedFlag: false,
  bookmarkSuccess: false,
};

const tweetReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_TWEET:
      return { ...state, tweetPostedFlag: true };
    case actionTypes.TWEET_FEED:
      return {
        ...state,
        feed: _.chain(state.feed)
          .concat(action.payload)
          .uniqBy('_id')
          .value(),
      };
    case actionTypes.TWEET_DETAILS:
      return { ...state, currentTweet: action.payload };
    case actionTypes.GET_BOOKMARKS:
      return { ...state, bookmarkedTweets: action.payload.bookmarkedTweets };
    case actionTypes.DELETE_TWEET:
      return { ...state, tweetDeletedFlag: true };
    case actionTypes.BOOKMARK_TWEET:
      return { ...state, bookmarkSuccess: true };
    case actionTypes.UPDATE_TWEET_FEED:
      return {
        ...state,
        feed: action.payload,
      };
    default:
      break;
  }
  return state;
};

export default tweetReducer;
