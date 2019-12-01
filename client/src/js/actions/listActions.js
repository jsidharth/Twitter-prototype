/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {
  toast
} from 'react-toastify';
import actionTypes from '../constants/index';

import {
  ROOT_URL
} from '../../constant/constant';

export const getLists = payload => {
  return dispatch => {
    console.log(payload);
    return axios.get(`${ROOT_URL}/list/getLists/${payload}`).then(response => {
      console.log('Status Code : ', response.status);
      if (response.status === 200) {
        dispatch({
          type: actionTypes.GET_LISTS,
          payload: response.data,
        });
      }
    });
  };
};

export const getListDetails = payload => {
  return dispatch => {
    console.log(payload);
    return axios.get(`${ROOT_URL}/list/getListDetails/${payload}`).then(response => {
      console.log('Status Code : ', response.status);
      if (response.status === 200) {
        dispatch({
          type: actionTypes.GET_LIST_DETAILS,
          payload: response.data,
        });
      }
    });
  };
};

export const subscribeList = payload => {
  return dispatch => {
    return axios
      .post(`${ROOT_URL}/list/subscribe`, payload)
      .then(response => {
        console.log('Status Code : ', response.status);
        console.log(response.data);
        if (response.status === 200) {
          toast.info('Subscribed to List', {
            position: 'bottom-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          dispatch({
            type: actionTypes.UPDATE_SUBSCRIPTION,
            payload: response.data,
          });
          return Promise.resolve();
        }
        return Promise.reject();
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const unsubscribeList = payload => {
  return dispatch => {
    return axios
      .post(`${ROOT_URL}/list/unsubscribe`, payload)
      .then(response => {
        console.log('Status Code : ', response.status);
        console.log(response.data);
        if (response.status === 200) {
          toast.info('Unsubscribed from the List', {
            position: 'bottom-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          dispatch({
            type: actionTypes.UPDATE_SUBSCRIPTION,
            payload: response.data,
          });
          return Promise.resolve();
        }
        return Promise.reject();
      })
      .catch(error => {
        console.log(error);
      });
  };
};