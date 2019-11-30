/* eslint-disable no-underscore-dangle */
import Tweets from '../../models/tweet.model';
import Users from '../../models/user.model';
import getTweetDetail from './tweetDetail';

const handleRequest = async (tweetDetails, callback) => {
  let { tweetText } = tweetDetails;
  const hashtags = [];
  tweetText = tweetText.split(' ');
  // Extracting hastags from tweet body
  tweetText.forEach(word => {
    if (word[0] === '#') {
      hashtags.push(word.substr(1));
    }
  });
  // Create a new tweet, as replies are independent tweets.
  const tweet = await Tweets.create({
    body: tweetDetails.tweetText,
    image: tweetDetails.imageUrl,
    hashtags,
  });
  const user = await Users.findById(tweetDetails.userId);
  if (!user) {
    callback({ message: 'User not found!' }, null);
  } else {
    user.tweets.push(tweet._id);
    await user.save();
    // Add tweeet to parent tweets comment array
    const parentTweet = await Tweets.findById(tweetDetails.parentTweetID);
    if (!parentTweet) {
      callback(
        {
          message: 'Parent tweet not found',
        },
        null
      );
    } else {
      parentTweet.comments.push(tweet._id);
      await parentTweet.save();
      getTweetDetail.handleRequest(parentTweet._id, callback);
    }
  }
};

export default {
  handleRequest,
};
