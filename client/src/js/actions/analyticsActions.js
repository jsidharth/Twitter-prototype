/* eslint-disable import/no-named-as-default */
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
export const getAnalyticsMostViewedTweets = () => {
  return dispatch => {
    return axios.get(`${ROOT_URL}/analytics/mostViews`).then(response => {
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
export const getNumberOfTweets = () => {
  return dispatch => {
    return axios.get(`${ROOT_URL}/analytics/numberOfTweets`).then(response => {
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
export const getMostLikedTweets = () => {
  return dispatch => {
    return axios.get(`${ROOT_URL}/analytics/mostLikes`).then(response => {
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
export const getMostRetweetedTweets = () => {
  return dispatch => {
    return axios.get(`${ROOT_URL}/analytics/mostRetweets`).then(response => {
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
