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
    tweet.likes.pull(tweetDetails.userId);
    const likeCount = tweet.likes.length;
    await tweet.save();

    callback(null, {
      message: `likeCount: ${likeCount}`,
    });
  }
};

export default {
  handleRequest,
};
