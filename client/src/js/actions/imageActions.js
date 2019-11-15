import axios from 'axios';
import actionTypes from '../constants/index';

const ROOT_URL = 'http://localhost:3001';

export const upload = payload => {
  return dispatch => {
    return axios.post(`${ROOT_URL}/image/upload`, payload).then(response => {
      console.log('Status Code : ', response.status);
      console.log(response.data)
      if (response.status === 200) {
        dispatch({
          type: actionTypes.UPLOAD_IMAGE,
          payload: response.data,
        });
      }
    });
  };
};