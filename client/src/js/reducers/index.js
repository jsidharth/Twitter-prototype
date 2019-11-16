import { combineReducers } from 'redux';
import image from './imageReducer';
import tweet from './tweetReducer';

const rootReducer = combineReducers({
  image,
  tweet,
});

export default rootReducer;
