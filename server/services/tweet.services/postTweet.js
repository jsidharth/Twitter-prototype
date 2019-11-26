import Users from '../../models/user.model';
import Tweets from '../../models/tweet.model';

const handleRequest = async (tweetDetails, callback) => {
  let { tweetText } = tweetDetails;
  const hashtags = [];
  tweetText = tweetText.split(' ');
  // eslint-disable-next-line no-restricted-syntax
  for (const word of tweetText) {
    if (word[0] === '#') {
      hashtags.push(word.substr(1));
    }
  }
  const tweet = await Tweets.create({
    body: tweetDetails.tweetText,
    image: tweetDetails.imageUrl,
    hashtags,
  });
  const user = await Users.findById(tweetDetails.userId);
  if (!user) {
    callback({ message: 'User not found!' }, null);
  } else {
    // eslint-disable-next-line no-underscore-dangle
    user.tweets.push(tweet._id);
    await user.save();
    callback(null, {
      message: 'Tweet Posted!',
    });
  }
};

export default {
  handleRequest,
};
