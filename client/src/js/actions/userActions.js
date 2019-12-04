/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import cookie from 'js-cookie';
import moment from 'moment';
import { toast } from 'react-toastify';
import actionTypes from '../constants/index';
import { ROOT_URL } from '../../constant/constant';
import { history } from '../helper/history';

export const register = payload => {
  return dispatch => {
    return axios
      .post(`${ROOT_URL}/user/register`, payload)
      .then(response => {
        console.log('Status Code : ', response.status);
        console.log(response.data);
        if (response.status === 200) {
          dispatch({
            type: actionTypes.USER_REGISTER,
            payload: response.data,
          });
          cookie.set('token', response.data.token);
          history.push('/home');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const login = payload => {
  return dispatch => {
    return axios
      .post(`${ROOT_URL}/user/login`, payload)
      .then(response => {
        console.log('Status Code : ', response.status);
        console.log(response.data);
        if (response.status === 200) {
          dispatch({
            type: actionTypes.USER_LOGIN,
            payload: response.data,
          });
          cookie.set('token', response.data.token);
          history.push('/home');
          if (!response.data.previousState) {
            toast.success('Your account has been reactivated. Welcome back!', {
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getUserProfile = payload => {
  return dispatch => {
    return axios.get(`${ROOT_URL}/user/details/${payload.userId}`).then(response => {
      console.log('Status Code : ', response.status);
      console.log(response.data);
      if (response.status === 200) {
        dispatch({
          type: actionTypes.GET_USER_PROFILE,
          payload: response.data,
        });
      }
      return Promise.resolve();
    });
  };
};

export const updateProfile = payload => {
  return dispatch => {
    return axios.put(`${ROOT_URL}/user/details/`, payload).then(response => {
      console.log('Status Code : ', response.status);
      if (response.status === 200) {
        dispatch({
          type: actionTypes.GET_USER_PROFILE,
          payload: response.data,
        });
        dispatch({
          type: actionTypes.RESET_IMAGE_STATE,
        });
        dispatch({
          type: actionTypes.USER_LOGIN,
          payload: {
            _id: response.data._id,
            name: response.data.name,
            email: response.data.email,
            dob: moment(response.data.dob).format('MM-DD-YYYY'),
            active: response.data.active,
            bookmarks: response.data.bookmarks,
            profilePic: response.data.profilePic,
            handle: response.data.handle,
            subscribedLists: response.data.subscribedLists,
          },
        });
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

export const follow = payload => {
  return () => {
    return axios
      .post(`${ROOT_URL}/user/follow`, payload)
      .then(response => {
        console.log('Status Code : ', response.status);
        console.log(response.data);
        if (response.status === 200) {
          return Promise.resolve();
        }
        return Promise.reject();
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const unfollow = payload => {
  return () => {
    return axios
      .post(`${ROOT_URL}/user/unfollow`, payload)
      .then(response => {
        console.log('Status Code : ', response.status);
        console.log(response.data);
        if (response.status === 200) {
          return Promise.resolve();
        }
        return Promise.reject();
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const deactivate = payload => {
  return () => {
    console.log(`${payload.userId}`);
    return axios
      .put(`${ROOT_URL}/user/deactivate/${payload.userId}`)
      .then(response => {
        console.log('Status Code : ', response.status);
        console.log(response.data);
        if (response.status === 200) {
          cookie.remove('token');
          localStorage.clear();
          history.push('/');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};
