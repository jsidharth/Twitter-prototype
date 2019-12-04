import Promise from 'bluebird';
import Users from '../../models/user.model';
import Tweets from '../../models/tweet.model';

const handleRequest = async (tweetId, callback) => {
  let user = await Users.findOne({
    tweets: {
      $in: [tweetId],
    },
  });
  if (user) {
    user.tweets = user.tweets.filter(e => e.toString() !== tweetId);
    await user.save();
  }

  user = await Users.findOne({
    retweets: {
      $in: [tweetId],
    },
  });
  if (user) {
    user.retweets = user.retweets.filter(e => e.toString() !== tweetId);
    await user.save();
  }

  const users = await Users.find({
    bookmarks: {
      $in: [tweetId],
    },
  });
  if (users && users.length) {
    await Promise.map(users, async oneUser => {
      // eslint-disable-next-line no-param-reassign
      oneUser.bookmarks = oneUser.bookmarks.filter(e => e.toString() !== tweetId);
      await oneUser.save();
    });
  }

  await Tweets.deleteOne({
    _id: tweetId,
  });
  callback(null, {
    message: 'Tweet Deleted Successfully',
  });
};

export default {
  handleRequest,
};