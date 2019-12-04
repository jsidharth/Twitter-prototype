import axios from 'axios';
import { toast } from 'react-toastify';
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
        dispatch({
          type: actionTypes.RESET_IMAGE_STATE,
        });
        toast.info(response.data.message, {
          position: 'bottom-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    });
  };
};

export const fetchFeed = payload => {
  return dispatch => {
    return axios
      .get(`${ROOT_URL}/tweet/feed/${payload.userId}`, {
        params: {
          count: payload.count,
          offset: payload.offset,
        },
      })
      .then(response => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          dispatch({
            type: actionTypes.TWEET_FEED,
            payload: response.data.results,
          });
          return Promise.resolve(response.data.size);
        }
        return Promise.resolve();
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
  return () => {
    return axios.put(`${ROOT_URL}/tweet/like`, payload).then(response => {
      console.log('Status Code : ', response.status);
      return Promise.resolve();
    });
  };
};

export const unlikeTweet = payload => {
  return () => {
    return axios.put(`${ROOT_URL}/tweet/unlike`, payload).then(response => {
      console.log('Status Code : ', response.status);
      return Promise.resolve();
    });
  };
};

export const deleteTweet = payload => {
  return dispatch => {
    return axios.delete(`${ROOT_URL}/tweet/delete/${payload.tweetId}`, payload).then(response => {
      console.log('Status Code : ', response.status);
      if (response.status === 200) {
        dispatch({
          type: actionTypes.DELETE_TWEET,
          payload: response.data,
        });
        toast.info(response.data.message, {
          position: 'bottom-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return Promise.resolve();
      }
      return Promise.reject();
    });
  };
};

export const bookmarkTweet = payload => {
  return dispatch => {
    return axios.post(`${ROOT_URL}/tweet/bookmark`, payload).then(response => {
      console.log('Status Code : ', response.status);
      if (response.status === 200) {
        dispatch({
          type: actionTypes.BOOKMARK_TWEET,
          payload: response.data,
        });
        toast.info(response.data.message, {
          position: 'bottom-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    });
  };
};

export const replyTweet = payload => {
  return dispatch => {
    console.log(payload);
    return axios.post(`${ROOT_URL}/tweet/reply`, payload).then(response => {
      console.log('Status Code : ', response.status);
      if (response.status === 200) {
        dispatch({
          type: actionTypes.TWEET_DETAILS,
          payload: response.data,
        });
        dispatch({
          type: actionTypes.RESET_IMAGE_STATE,
        });
        toast.info('Reply posted!', {
          position: 'bottom-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return Promise.resolve();
      }
    });
  };
};

export const retweet = payload => {
  return () => {
    return axios.post(`${ROOT_URL}/tweet/retweet`, payload).then(response => {
      console.log('Status Code : ', response.status);
      if (response.status === 200) {
        toast.info(response.data.message, {
          position: 'bottom-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    });
  };
};

export const fetchUpdatedFeed = payload => {
  return dispatch => {
    return axios
      .get(`${ROOT_URL}/tweet/feed/${payload.userId}`, {
        params: {
          count: payload.count,
          offset: payload.offset,
        },
      })
      .then(response => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          dispatch({
            type: actionTypes.UPDATE_TWEET_FEED,
            payload: response.data.results,
          });
          return Promise.resolve(response.data.size);
        }
        return Promise.resolve();
      });
  };
};
