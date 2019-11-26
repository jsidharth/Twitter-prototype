import { combineReducers } from 'redux';
import image from './imageReducer';
import tweet from './tweetReducer';
import user from './userReducer';
import search from './searchReducer';

const rootReducer = combineReducers({
  image,
  tweet,
  user,
  search,
});

export default rootReducer;
