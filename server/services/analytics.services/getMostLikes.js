/* eslint-disable no-underscore-dangle */
import Tweets from '../../models/tweet.model';

const handleRequest = callback => {
  Tweets.aggregate([{ $project: { likesCount: { $size: '$likes' }, tweetId: '$_id' } }])
    .sort({ likesCount: -1 })
    .limit(10)
    .exec((err, result) => {
      if (err || !result) {
        callback(
          {
            message: 'Fetch Most Liked Tweets Failed!',
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
