import getTweetFeed from '../services/tweet.services/tweetFeed';
import postTweet from '../services/tweet.services/postTweet';
import getTweetDetail from '../services/tweet.services/tweetDetail';
import deleteTweet from '../services/tweet.services/deleteTweet';
import retweet from '../services/tweet.services/retweet';
import bookmark from '../services/tweet.services/bookmark';
import getBookmarks from '../services/tweet.services/getBookmarks';
import likeTweet from '../services/tweet.services/likeTweet';
import unlikeTweet from '../services/tweet.services/unlikeTweet';
import replyTweet from '../services/tweet.services/replyTweet';

const handleRequest = (payload, callback) => {
  switch (payload.action) {
    case 'TWEET_FEED':
      getTweetFeed.handleRequest(payload.params, callback);
      break;
    case 'TWEET_POST':
      postTweet.handleRequest(payload.body, callback);
      break;
    case 'TWEET_DETAIL':
      getTweetDetail.handleRequest(payload.tweetId, callback);
      break;
    case 'TWEET_DELETE':
      deleteTweet.handleRequest(payload.tweetId, callback);
      break;
    case 'TWEET_RETWEET':
      retweet.handleRequest(payload.body, callback);
      break;
    case 'TWEET_BOOKMARK':
      bookmark.handleRequest(payload.body, callback);
      break;
    case 'TWEET_GET_BOOKMARKS':
      getBookmarks.handleRequest(payload.body, callback);
      break;
    case 'TWEET_LIKE':
      likeTweet.handleRequest(payload.body, callback);
      break;
    case 'TWEET_UNLIKE':
      unlikeTweet.handleRequest(payload.body, callback);
      break;
    case 'TWEET_REPLY':
      replyTweet.handleRequest(payload.body, callback);
      break;
    default:
      break;
  }
};

// eslint-disable-next-line import/prefer-default-export
export { handleRequest };
