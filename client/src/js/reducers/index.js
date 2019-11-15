import { combineReducers } from 'redux';
import image from './imageReducer';

const rootReducer = combineReducers({
  image,
});

export default rootReducer;