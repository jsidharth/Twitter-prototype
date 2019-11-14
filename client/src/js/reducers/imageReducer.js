import actionTypes from '../constants/index';

const initialState = {
  imageUrl: '',
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPLOAD_IMAGE:
      console.log(action.payload.image);
      return { ...state, imageUrl: action.payload.image };

    default:
      break;
  }
  return state;
};

export default imageReducer;
