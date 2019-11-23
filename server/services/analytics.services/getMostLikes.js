import Users from '../../models/user.model';
import Tweets from '../../models/tweet.model';

const handleRequest = (userId, callback) => {
  let mostLikesArray = [];
  Users.findOne({ _id: userId })
    .populate('tweets', 'likes')
    .exec((err, result) => {
      if (err || !result) {
        callback({ message: 'Fetch Most Liked Tweets Failed!' }, null);
      } else {
        result.tweets.forEach(element => {
          const eachObject = { tweetId: element._id, likesCount: element.likes.length };
          mostLikesArray.push(eachObject);
        });
        mostLikesArray = mostLikesArray.sort(
          (first, second) => second.likesCount - first.likesCount
        );
        callback(null, mostLikesArray.slice(0, 10));
      }
    });
};

export default {
  handleRequest,
};
