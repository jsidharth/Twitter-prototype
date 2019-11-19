import Users from '../../models/user.model';
import Tweets from '../../models/tweet.model';

const handleRequest = async (tweetDetails, callback) => {
  const tweet = await Tweets.findById(tweetDetails.tweetId);
  if (!tweet) {
    callback({ message: 'Tweet not found!' }, null);
  }
  const user = await Users.findById(tweetDetails.userId);
  if (!user) {
    callback({ message: 'User not found!' }, null);
  } else {
    user.bookmarks.push(tweetDetails.tweetId);
    await user.save();
    callback(null, {
      message: 'Tweet Bookmarked',
    });
  }
};

export default {
  handleRequest,
};
