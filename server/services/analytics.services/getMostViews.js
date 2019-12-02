/* eslint-disable no-underscore-dangle */
import Tweets from '../../models/tweet.model';

const handleRequest = callback => {
  let mostViewsArray = [];
  Tweets.find({}).exec((err, result) => {
    if (err || !result) {
      callback(
        {
          message: 'Fetch Most Viewed Tweets Failed!',
        },
        null
      );
    } else {
      result.forEach(element => {
        const eachObject = {
          tweetId: element._id,
          viewsCount: element.views,
        };
        mostViewsArray.push(eachObject);
      });
      mostViewsArray = mostViewsArray.sort((first, second) => second.viewsCount - first.viewsCount);
      callback(null, mostViewsArray.slice(0, 10));
    }
  });
};

export default {
  handleRequest,
};
