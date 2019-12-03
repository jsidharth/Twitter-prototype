/* eslint-disable no-underscore-dangle */
import Tweets from '../../models/tweet.model';

const handleRequest = callback => {
  Tweets.aggregate([{ $project: { viewsCount: '$views', tweetId: '$_id' } }])
    .sort({ viewsCount: -1 })
    .limit(10)
    .exec((err, result) => {
      if (err || !result) {
        callback(
          {
            message: 'Fetch Most Viewed Tweets Failed!',
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
