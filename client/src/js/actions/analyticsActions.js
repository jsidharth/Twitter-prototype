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

export const getLikedTweets = payload => {
  return dispatch => {
    return axios.get(`${ROOT_URL}/user/like/${payload.userId}`).then(response => {
      console.log('Status Code : ', response.status);
      console.log(response.data);
      if (response.status === 200) {
        dispatch({
          type: actionTypes.GET_LIKED_TWEETS,
          payload: response.data,
        });
      }
      return Promise.resolve();
    });
  };
};

