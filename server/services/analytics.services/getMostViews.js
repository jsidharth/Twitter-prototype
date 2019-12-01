/* eslint-disable no-underscore-dangle */
import Users from '../../models/user.model';

const handleRequest = (userId, callback) => {
  let mostViewsArray = [];
  Users.findOne({
    _id: userId,
  })
    .populate('tweets', 'views')
    .exec((err, result) => {
      if (err || !result) {
        callback(
          {
            message: 'Fetch Most Viewed Tweets Failed!',
          },
          null
        );
      } else {
        result.tweets.forEach(element => {
          const eachObject = {
            tweetId: element._id,
            viewsCount: element.views,
          };
          mostViewsArray.push(eachObject);
        });
        mostViewsArray = mostViewsArray.sort(
          (first, second) => second.viewsCount - first.viewsCount
        );
        callback(null, mostViewsArray.slice(0, 10));
      }
    });
};

export default {
  handleRequest,
};
