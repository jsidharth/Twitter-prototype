/* eslint-disable no-underscore-dangle */
import Promise from 'bluebird';
import moment from 'moment';
import Users from '../../models/user.model';
import Tweets from '../../models/tweet.model';

const handleRequest = async (searchTerm, callback) => {
  const users = await Users.aggregate([
    {
      $match: {
        name: {
          $regex: searchTerm,
          $options: 'i',
        },
      },
    },
    {
      $project: {
        name: 1,
        bio: 1,
        handle: 1,
        profilePic: 1,
      },
    },
  ]);

  const searchTweets = await Tweets.aggregate([
    {
      $match: {
        body: {
          $regex: searchTerm,
          $options: 'i',
        },
      },
    },
  ]);
  if (searchTweets && searchTweets.length) {
    let updatedTweets = await Promise.map(searchTweets, async tweet => {
      const user = await Users.findOne(
        {
          tweets: tweet._id,
        },
        {
          name: 1,
          handle: 1,
          profilePic: 1,
        }
      );
      return {
        _id: tweet._id,
        name: user.name,
        handle: user.handle,
        profilePic: user.profilePic,
        likes_count: tweet.likes.length || 0,
        comments_count: tweet.comments.length || 0,
        retweet_count: tweet.retweets.length || 0,
        body: tweet.body,
        image: tweet.image,
        created_at: tweet.createdAt,
        likes: tweet.likes,
      };
    });
    updatedTweets = updatedTweets.sort((first, second) =>
      moment(second.created_at).diff(first.created_at)
    );
    let updateTweetViewsPromise = Promise.resolve();
    updateTweetViewsPromise = Promise.map(updatedTweets, tweet => {
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
        users,
        tweets: updatedTweets,
      });
    });
  } else {
    callback(null, {
      users,
      tweets: [],
    });
  }
};

export default {
  handleRequest,
};
