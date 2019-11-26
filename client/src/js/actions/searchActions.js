/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import actionTypes from '../constants/index';
import { ROOT_URL } from '../../constant/constant';

export const getSearchSuggestions = payload => {
  return dispatch => {
    console.log(payload);
    return axios.get(`${ROOT_URL}/search/${payload}`).then(response => {
      console.log('Status Code : ', response.status);
      if (response.status === 200) {
        dispatch({
          type: actionTypes.SEARCH_SUGGESTIONS,
          payload: response.data,
        });
      }
    });
  };
};
