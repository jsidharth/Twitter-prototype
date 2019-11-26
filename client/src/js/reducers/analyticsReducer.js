import actionTypes from '../constants/index';

const initialState = {
  viewsPerDayData: [],
};

const analyticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ANALYTICS_PROFILE_VIEWS_PER_DAY:
      return { ...state, viewsPerDayData: action.payload };
    default:
      break;
  }
  return state;
};

export default analyticsReducer;
