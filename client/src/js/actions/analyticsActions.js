import axios from 'axios';
import actionTypes from '../constants/index';
import { ROOT_URL } from '../../constant/constant';

export const getAnalyticsProfileViewsPerDay = payload => {
  return dispatch => {
    return axios
      .get(`${ROOT_URL}/analytics/profileViewsPerDay/${payload.userId}`)
      .then(response => {
        console.log('Status Code : ', response.status);
        console.log(response.data);
        if (response.status === 200) {
          dispatch({
            type: actionTypes.ANALYTICS_PROFILE_VIEWS_PER_DAY,
            payload: response.data,
          });
          return Promise.resolve();
        }
      });
  };
};
export const getAnalyticsMostViewedTweets = payload => {
  return dispatch => {
    return axios.get(`${ROOT_URL}/analytics/mostViews/${payload.userId}`).then(response => {
      console.log('Status Code : ', response.status);
      console.log(response.data);
      if (response.status === 200) {
        dispatch({
          type: actionTypes.ANALYTICS_MOST_VIEWED_TWEETS,
          payload: response.data,
        });
      }
      return Promise.resolve();
    });
  };
};
export const getNumberOfTweets = payload => {
  return dispatch => {
    return axios.get(`${ROOT_URL}/analytics/numberOfTweets/${payload.userId}`).then(response => {
      console.log('Status Code : ', response.status);
      console.log(response.data);
      if (response.status === 200) {
        dispatch({
          type: actionTypes.ANALYTICS_NUMBER_OF_TWEETS,
          payload: response.data,
        });
      }
      return Promise.resolve();
    });
  };
};
export const getMostLikedTweets = payload => {
  return dispatch => {
    return axios.get(`${ROOT_URL}/analytics/mostLikes/${payload.userId}`).then(response => {
      console.log('Status Code : ', response.status);
      console.log(response.data);
      if (response.status === 200) {
        dispatch({
          type: actionTypes.ANALYTICS_MOST_LIKED_TWEET,
          payload: response.data,
        });
      }
      return Promise.resolve();
    });
  };
};
export const getMostRetweetedTweets = payload => {
  return dispatch => {
    return axios.get(`${ROOT_URL}/analytics/mostRetweets/${payload.userId}`).then(response => {
      console.log('Status Code : ', response.status);
      console.log(response.data);
      if (response.status === 200) {
        dispatch({
          type: actionTypes.ANALYTICS_MOST_RETWEETED_TWEET,
          payload: response.data,
        });
      }
      return Promise.resolve();
    });
  };
};
