import { combineReducers } from 'redux';
import image from './imageReducer';
import tweet from './tweetReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  image,
  tweet,
  user,
});

export default rootReducer;
