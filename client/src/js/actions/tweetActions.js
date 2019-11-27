import axios from 'axios';
import actionTypes from '../constants/index';
import { ROOT_URL } from '../../constant/constant';

// eslint-disable-next-line import/prefer-default-export
export const postTweet = payload => {
  return dispatch => {
    return axios.post(`${ROOT_URL}/tweet/post`, payload).then(response => {
      console.log('Status Code : ', response.status);
      if (response.status === 200) {
        dispatch({
          type: actionTypes.POST_TWEET,
          payload: response.data,
        });
      }
    });
  };
};

export const fetchFeed = payload => {
  return dispatch => {
    return axios.get(`${ROOT_URL}/tweet/feed/${payload.userId}`).then(response => {
      console.log('Status Code : ', response.status);
      if (response.status === 200) {
        dispatch({
          type: actionTypes.TWEET_FEED,
          payload: response.data,
        });
      }
    });
  };
};

export const getTweetDetails = payload => {
  return dispatch => {
    return axios.get(`${ROOT_URL}/tweet/detail/${payload.tweetId}`).then(response => {
      console.log('Status Code : ', response.status);
      if (response.status === 200) {
        console.log(response.data);
        dispatch({
          type: actionTypes.TWEET_DETAILS,
          payload: response.data,
        });
      }
    });
  };
};

export const getBookmarks = payload => {
  return dispatch => {
    return axios.get(`${ROOT_URL}/tweet/bookmark/${payload.userId}`).then(response => {
      console.log('Status Code: ', response.status);
      if (response.status === 200) {
        dispatch({
          type: actionTypes.GET_BOOKMARKS,
          payload: response.data,
        });
      }
    });
  };
};

export const likeTweet = payload => {
  return dispatch => {
    return axios.put(`${ROOT_URL}/tweet/like`, payload).then(response => {
      console.log('Status Code : ', response.status);
      return Promise.resolve();
    });
  };
};

export const unlikeTweet = payload => {
  return dispatch => {
    return axios.put(`${ROOT_URL}/tweet/unlike`, payload).then(response => {
      console.log('Status Code : ', response.status);
      return Promise.resolve();
    });
  };
};
