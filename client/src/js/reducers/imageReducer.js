import actionTypes from '../constants/index';

const initialState = {
  imageUrl: '',
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPLOAD_IMAGE:
      return { ...state, imageUrl: action.payload.image };
    case actionTypes.RESET_IMAGE_STATE:
      return { ...state, imageUrl: ''};
    default:
      break;
  }
  return state;
};

export default imageReducer;