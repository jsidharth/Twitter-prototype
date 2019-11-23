import Users from '../../models/user.model';
import Tweets from '../../models/tweet.model';

const handleRequest = (userId, callback) => {
  let mostRetweetsArray = [];
  Users.find({ _id: userId })
    .populate('tweets', 'retweets')
    .exec((err, result) => {
      if (err) {
        callback({ message: 'Fetch Most Retweeted Tweets Failed!' }, null);
      } else {
        result[0].tweets.forEach(element => {
          const eachObject = { tweetId: element._id, retweetCount: element.retweets.length };
          mostRetweetsArray.push(eachObject);
        });
        mostRetweetsArray = mostRetweetsArray.sort((first, second) => {
          return second.likesCount - first.likesCount;
        });
        callback(null, mostRetweetsArray.slice(0, 5));
      }
    });
};

export default {
  handleRequest,
};
