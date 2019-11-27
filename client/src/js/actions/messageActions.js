/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import actionTypes from '../constants/index';

const ROOT_URL = 'http://localhost:3001';

export const getMessageDetails = payload => {
  return dispatch => {
    return axios.get(`${ROOT_URL}/message/get/${payload.userId}`).then(response => {
      console.log('Status Code : ', response.status);
      console.log(response.data);
      if (response.status === 200) {
        dispatch({
          type: actionTypes.MESSAGE_GET,
          payload: response.data,
        });
      }
    });
  };
};

export const setActiveMessage = payload => {
  return dispatch => {
    dispatch({
      type: actionTypes.ACTIVE_MESSAGE,
      payload,
    });
  };
};

export const sendMessage = payload => {
  return dispatch => {
    console.log(payload);
    return axios.post(`${ROOT_URL}/message/compose`, payload).then(response => {
      console.log('Status Code : ', response.status);
      if (response.status === 200) {
        dispatch({
          type: actionTypes.ACTIVE_MESSAGE,
          payload: response.data,
        });
      }
    });
  };
};

export const composeMessage = payload => {
  return dispatch => {
    console.log(payload);
    return axios.post(`${ROOT_URL}/message/compose`, payload).then(response => {
      console.log('Status Code : ', response.status);
    });
  };
};