import Promise from 'bluebird';
import Users from '../../models/user.model';
import Tweets from '../../models/tweet.model';

const handleRequest = async (searchTerm, callback) => {
  const searchTweets = await Tweets.find({
    hashtags: {
      $in: [searchTerm],
    },
  });
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
      tweets: updatedTweets,
    });
  } else {
    callback(null, {
      tweets: [],
    });
  }
};

export default {
  handleRequest,
};
