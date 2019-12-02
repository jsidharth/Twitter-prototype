/* eslint-disable no-underscore-dangle */
import Tweets from '../../models/tweet.model';

const handleRequest = callback => {
  let mostLikesArray = [];
  Tweets.find({}).exec((err, result) => {
    if (err || !result) {
      callback(
        {
          message: 'Fetch Most Liked Tweets Failed!',
        },
        null
      );
    } else {
      result.forEach(element => {
        const eachObject = {
          tweetId: element._id,
          likesCount: element.likes.length,
        };
        mostLikesArray.push(eachObject);
      });
      mostLikesArray = mostLikesArray.sort((first, second) => second.likesCount - first.likesCount);
      callback(null, mostLikesArray.slice(0, 10));
    }
  });
};

export default {
  handleRequest,
};
