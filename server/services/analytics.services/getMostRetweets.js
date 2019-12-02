/* eslint-disable no-underscore-dangle */
import Tweets from '../../models/tweet.model';

const handleRequest = callback => {
  let mostRetweetsArray = [];
  Tweets.find({}).exec((err, result) => {
    if (err || !result) {
      callback(
        {
          message: 'Fetch Most Retweeted Tweets Failed!',
        },
        null
      );
    } else {
      result.forEach(element => {
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
