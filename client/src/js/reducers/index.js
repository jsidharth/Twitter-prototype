import { combineReducers } from 'redux';
import image from './imageReducer';
import tweet from './tweetReducer';
import user from './userReducer';
import search from './searchReducer';
import analytics from './analyticsReducer';
import list from './listReducer';

const rootReducer = combineReducers({
  image,
  tweet,
  user,
  search,
  analytics,
  list,
});

export default rootReducer;
