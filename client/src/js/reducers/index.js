import { combineReducers } from 'redux';
import image from './imageReducer';
import tweet from './tweetReducer';
import user from './userReducer';
import message from './messageReducer';
import search from './searchReducer';
import analytics from './analyticsReducer';

const rootReducer = combineReducers({
  image,
  tweet,
  user,
  message,
  search,
  analytics,
});

export default rootReducer;
