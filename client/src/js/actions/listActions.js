/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import actionTypes from '../constants/index';
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