import { combineReducers } from 'redux';
import image from './imageReducer';
import tweet from './tweetReducer';
import user from './userReducer';
import message from './messageReducer';

const rootReducer = combineReducers({
  image,
  tweet,
  user,
  message,
});

export default rootReducer;
