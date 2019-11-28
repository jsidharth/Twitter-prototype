import { combineReducers } from 'redux';
import image from './imageReducer';
import tweet from './tweetReducer';
import user from './userReducer';
import message from './messageReducer';
import search from './searchReducer';
import analytics from './analyticsReducer';
import list from './listReducer';

const rootReducer = combineReducers({
  image,
  tweet,
  user,
  message,
  search,
  analytics,
  list,
});

export default rootReducer;
