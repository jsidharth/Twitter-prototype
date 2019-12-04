import axios from 'axios';
import actionTypes from '../constants/index';
import { ROOT_URL } from '../../constant/constant';

// eslint-disable-next-line import/prefer-default-export
export const upload = payload => {
  return dispatch => {
    return axios.post(`${ROOT_URL}/image/upload`, payload).then(response => {
      console.log('Status Code : ', response.status);
      if (response.status === 200) {
        dispatch({
          type: actionTypes.UPLOAD_IMAGE,
          payload: response.data,
        });
      }
    });
  };
};
