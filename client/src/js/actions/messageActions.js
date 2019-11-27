/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import _ from 'lodash';
import actionTypes from '../constants/index';
import { ROOT_URL } from '../../constant/constant';

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
    return axios.get(`${ROOT_URL}/message/get/${payload.userId}`).then(response => {
      console.log('Status Code : ', response.status);
      console.log(response.data);
      if (response.status === 200) {
        const activeMessage = _.find(response.data, conv => conv._id === payload.convId);
        dispatch({
          type: actionTypes.ACTIVE_MESSAGE,
          payload: activeMessage,
        });
      }
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
