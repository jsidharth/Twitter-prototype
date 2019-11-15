import Promise from 'bluebird';
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
  if (searchTweets) {
    const updatedTweets = await Promise.map(searchTweets, tweet => {
      return Users.findOne(
        {
          // eslint-disable-next-line no-underscore-dangle
          tweets: tweet._id,
        },
        {
          name: 1,
          handle: 1,
        }
      ).then(user => {
        return {
          // eslint-disable-next-line no-underscore-dangle
          _id: tweet._id,
          name: user.name,
          handle: user.handle,
          likes_count: tweet.likes.length || 0,
          comments_count: tweet.comments.length || 0,
          retweet_count: tweet.retweets.length || 0,
          body: tweet.body,
          image: tweet.image,
          created_at: tweet.created_at,
        };
      });
    });
    callback(null, {
      users,
      tweets: updatedTweets,
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
