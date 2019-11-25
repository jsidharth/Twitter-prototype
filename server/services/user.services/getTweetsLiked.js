/* eslint-disable no-underscore-dangle */
import Promise from 'bluebird';
import moment from 'moment';
import Tweets from '../../models/tweet.model';
import Users from '../../models/user.model';

const handleRequest = (userId, callback) => {
  Tweets.find({
    likes: {
      $in: [userId],
    },
  }).then(tweets => {
    if (tweets && tweets.length) {
      Promise.map(tweets, tweet => {
        return Users.findOne({
          $or: [
            {
              tweets: tweet._id,
            },
            {
              retweets: tweet._id,
            },
          ],
        }).then(user => {
          return {
            _id: tweet._id,
            name: user.name,
            handle: user.handle,
            likes_count: tweet.likes.length || 0,
            comments_count: tweet.comments.length || 0,
            retweet_count: tweet.retweets.length || 0,
            body: tweet.body,
            image: tweet.image,
            profilePic: user.profilePic,
            created_at: tweet.created_at,
            likes: tweet.likes,
          };
        });
      }).then(likedTweets => {
        const updatedLikedTweets = likedTweets.sort((first, second) =>
          moment(second.created_at).diff(first.created_at)
        );
        Promise.map(updatedLikedTweets, tweet => {
          return Tweets.findOneAndUpdate({ _id: tweet._id }, { $inc: { views: 1 } });
        }).then(() => {
          callback(null, updatedLikedTweets);
        });
      });
    } else {
      callback(null, tweets);
    }
  });
};

export default {
  handleRequest,
};
