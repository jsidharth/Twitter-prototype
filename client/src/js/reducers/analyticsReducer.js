/* eslint-disable import/no-named-as-default-member */
import actionTypes from '../constants/index';

const initialState = {
  viewsPerDayData: [],
  mostViewedTweetData: [],
  numberOfTweetsData: [],
  mostLikedTweetData: [],
  mostRetweetedTweetData: [],
};

const analyticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ANALYTICS_PROFILE_VIEWS_PER_DAY:
      return { ...state, viewsPerDayData: action.payload };
    case actionTypes.ANALYTICS_MOST_VIEWED_TWEETS:
      return { ...state, mostViewedTweetData: action.payload };
    case actionTypes.ANALYTICS_NUMBER_OF_TWEETS:
      return { ...state, numberOfTweetsData: action.payload };
    case actionTypes.ANALYTICS_MOST_LIKED_TWEET:
      return { ...state, mostLikedTweetData: action.payload };
    case actionTypes.ANALYTICS_MOST_RETWEETED_TWEET:
      return { ...state, mostRetweetedTweetData: action.payload };
    default:
      break;
  }
  return state;
};

export default analyticsReducer;
