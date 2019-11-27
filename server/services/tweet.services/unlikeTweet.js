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
    const updatedTweet = await Tweets.findByIdAndUpdate(tweetDetails.tweetId, {
      $pull: {
        likes: tweetDetails.userId,
      },
    });
    callback(null, {
      message: `likeCount: ${updatedTweet.likes.length}`,
    });
  }
};

export default {
  handleRequest,
};
