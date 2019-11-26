import { combineReducers } from 'redux';
import image from './imageReducer';
import tweet from './tweetReducer';
import user from './userReducer';
import analytics from './analyticsReducer';

const rootReducer = combineReducers({
  image,
  tweet,
  user,
  analytics,
});

export default rootReducer;
