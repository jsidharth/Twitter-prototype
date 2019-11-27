import Tweets from '../../models/tweet.model';

const handleRequest = async (tweetDetails, callback) => {
  try {
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
        $addToSet: {
          likes: tweetDetails.userId,
        },
      });

      callback(null, {
        message: `likeCount: ${updatedTweet.likes.length}`,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export default {
  handleRequest,
};
