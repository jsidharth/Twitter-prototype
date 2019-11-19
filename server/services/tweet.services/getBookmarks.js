/* eslint-disable no-underscore-dangle */
import moment from 'moment';
import Promise from 'bluebird';
import Users from '../../models/user.model';
import Tweets from '../../models/tweet.model';

const handleRequest = async (userId, callback) => {
  const user = await Users.findById(userId);
  if (!user) {
    callback({ message: 'User not found!' }, null);
  } else {
    const bookmarkmarkedTweets = user.bookmarks;
    if (bookmarkmarkedTweets && bookmarkmarkedTweets.length) {
      let tweets = await Promise.map(bookmarkmarkedTweets, async tweet => {
        const tweetUser = await Users.findOne(
          {
            tweets: tweet._id,
          },
          {
            name: 1,
            handle: 1,
          }
        );
        return {
          _id: tweet._id,
          name: tweetUser.name,
          handle: tweetUser.handle,
          likes_count: tweet.likes.length || 0,
          comments_count: tweet.comments.length || 0,
          retweet_count: tweet.retweets.length || 0,
          body: tweet.body,
          image: tweet.image,
          created_at: tweet.created_at,
        };
      });
      tweets = tweets.sort((first, second) => moment(second.created_at).diff(first.created_at));
      let updateTweetViewsPromise = Promise.resolve();
      updateTweetViewsPromise = Promise.map(tweets, tweet => {
        return Tweets.findOneAndUpdate(
          {
            _id: tweet._id,
          },
          {
            $inc: {
              views: 1,
            },
          }
        );
      });
      updateTweetViewsPromise.then(() => {
        callback(null, {
          tweets,
        });
      });
    } else {
      callback(null, {
        tweets: [],
      });
    }
  }
};

export default {
  handleRequest,
};
