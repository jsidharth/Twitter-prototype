/* eslint-disable no-underscore-dangle */
import Users from '../../models/user.model';

const handleRequest = (userId, callback) => {
  let mostRetweetsArray = [];
  Users.findOne({
    _id: userId,
  })
    .populate('tweets', 'retweets')
    .exec((err, result) => {
      if (err || !result) {
        callback(
          {
            message: 'Fetch Most Retweeted Tweets Failed!',
          },
          null
        );
      } else {
        result.tweets.forEach(element => {
          const eachObject = {
            tweetId: element._id,
            retweetCount: element.retweets.length,
          };
          mostRetweetsArray.push(eachObject);
        });
        mostRetweetsArray = mostRetweetsArray.sort(
          (first, second) => second.retweetCount - first.retweetCount
        );
        callback(null, mostRetweetsArray.slice(0, 5));
      }
    });
};

export default {
  handleRequest,
};
