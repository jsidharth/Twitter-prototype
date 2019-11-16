import actionTypes from '../constants/index';

const initialState = {
  tweetPostedFlag: false,
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_TWEET:
      return { ...state, tweetPostedFlag: true };

    default:
      break;
  }
  return state;
};

export default imageReducer;
