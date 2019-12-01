/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import actionTypes from '../constants/index';
import { toast } from 'react-toastify';
import { ROOT_URL } from '../../constant/constant';

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

export const createList = payload => {
  return dispatch => {
    console.log(payload);
    return axios.post(`${ROOT_URL}/list/create`, payload).then(response => {
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
