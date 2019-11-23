import Users from '../../models/user.model';
import tweets from '../../models/tweet.model';

const handleRequest = (userId, callback) => {
  let mostViewsArray = [];
  Users.find({ _id: userId })
    .populate('tweets', 'views')
    .exec((err, result) => {
      if (err) {
        callback({ message: 'Fetch Most Viewed Tweets Failed!' }, null);
      } else {
        result[0].tweets.forEach(element => {
          const eachObject = { tweetId: element._id, viewsCount: element.views };
          mostViewsArray.push(eachObject);
        });
        mostViewsArray = mostViewsArray.sort((first, second) => {
          return second.viewsCount - first.viewsCount;
        });
        callback(null, mostViewsArray.slice(0, 10));
      }
    });
};

export default {
  handleRequest,
};
