import Tweets from '../../models/tweet.model';

const handleRequest = async (tweetDetails, callback) => {
  const tweet = await Tweets.findById(tweetDetails.tweetId);
  if (!tweet) {
    callback(
      {
        message: 'Tweet not found!',
      },
      null
    );
  } else {
    tweet.likes.push(tweetDetails.userId);
    const currentLikes = tweet.likes.length();
    await tweet.save();

    callback(null, {
      message: `likeCount: ${currentLikes}`,
    });
  }
};

export default {
  handleRequest,
};
