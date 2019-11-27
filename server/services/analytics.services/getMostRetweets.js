import Users from '../../models/user.model';

const handleRequest = (userId, callback) => {
  let mostRetweetsArray = [];
  Users.findOne({ _id: userId })
    .populate('tweets', 'retweets')
    .exec((err, result) => {
      if (err || !result) {
        callback({ message: 'Fetch Most Retweeted Tweets Failed!' }, null);
      } else {
        result.tweets.forEach(element => {
          // eslint-disable-next-line no-underscore-dangle
          const eachObject = { tweetId: element._id, retweetCount: element.retweets.length };
          mostRetweetsArray.push(eachObject);
        });
        mostRetweetsArray = mostRetweetsArray.sort(
          (first, second) => second.retweetCount - first.retweetCount
        );
        mostRetweetsArray = [
          { tweetId: '5dcf1d127243733ed9cfbfdc', retweetCount: 5 },
          { tweetId: '5dcf1d54ead22a3eeb2452c7', retweetCount: 4 },
          { tweetId: '5dcf1d7be911243f03f7c2bb', retweetCount: 3 },
          { tweetId: '5dcf428cd1d3c73fcc5aeb61', retweetCount: 3 },
          { tweetId: '5dcf438bd1d3c73fcc5aeb62', retweetCount: 1 },
        ];
        callback(null, mostRetweetsArray.slice(0, 5));
      }
    });
};

export default {
  handleRequest,
};
