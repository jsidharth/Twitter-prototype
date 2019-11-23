import Users from '../../models/user.model';
import tweets from '../../models/tweet.model';

const handleRequest = (userId, callback) => {
  let mostRetweetArray = [];
  Users.find({ _id: userId })
    .populate('tweets', 'retweets')
    .exec((err, result) => {
      if (err) {
        callback({ message: 'Fetch Most Retweeted Tweets Failed!' }, null);
      } else {
        console.log(result)
        result[0].tweets.forEach(element => {
          const eachObject = { tweetId: element._id, retweetCount: element.retweets.length };
          mostRetweetArray.push(eachObject);
        });
        mostRetweetArray = mostRetweetArray.sort((first, second) => {
          return second.likesCount - first.likesCount;
        });
        callback(null, mostRetweetArray.slice(0, 5));
      }
    });
};

export default {
  handleRequest,
};
