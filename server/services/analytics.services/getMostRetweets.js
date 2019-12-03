/* eslint-disable no-underscore-dangle */
import Tweets from '../../models/tweet.model';

const handleRequest = callback => {
  Tweets.aggregate([{ $project: { retweetCount: { $size: '$retweets' }, tweetId: '$_id' } }])
    .sort({ retweetCount: -1 })
    .limit(5)
    .exec((err, result) => {
      if (err || !result) {
        callback(
          {
            message: 'Fetch Most Retweeted Tweets Failed!',
          },
          null
        );
      } else {
        callback(null, result);
      }
    });
};

export default {
  handleRequest,
};
