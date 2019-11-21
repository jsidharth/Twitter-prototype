/* eslint-disable no-underscore-dangle */
import moment from 'moment';
import Promise from 'bluebird';
import Users from '../../models/user.model';
import Tweets from '../../models/tweet.model';

const handleRequest = async (userId, callback) => {
  const user = await Users.findById(userId).populate('bookmarks');
  if (!user) {
    callback(
      {
        message: 'User not found!',
      },
      null
    );
  } else {
    const tweets = user.bookmarks;
    if (tweets && tweets.length) {
      let updatedTweets = await Promise.map(tweets, async tweet => {
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
      
      updatedTweets = updatedTweets.sort((first, second) =>
        moment(second.created_at).diff(first.created_at)
      );
      // Updating tweet views for fetched bookmarks
      await Promise.map(updatedTweets, tweet => {
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
      callback(null, {
        bookMarkedtweets: updatedTweets,
      });
    } else {
      callback(null, {
        bookMarkedtweets: [],
      });
    }
  }
};

export default {
  handleRequest,
};
