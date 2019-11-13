/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import moment from 'moment';
import Users from '../../models/user.model';
import Tweets from '../../models/tweet.model';

const handleRequest = async (userId, callback) => {
  Users.findById(userId)
    .populate({
      path: 'following',
      populate: {
        path: 'tweets',
      },
    })
    .populate('tweets')
    .lean()
    .then(user => {
      if (!user) {
        callback(
          {
            message: 'User not found!',
          },
          null
        );
      }
      let results = [];
      let userTweets = [];
      let followingTweets = [];
      if (user.tweets && user.tweets.length) {
        userTweets = _.map(user.tweets, tweet => ({
          id: tweet._id,
          name: user.name,
          handle: user.handle,
          likes_count: tweet.likes.length || 0,
          comments_count: tweet.comments.length || 0,
          retweet_count: tweet.retweets.length || 0,
          body: tweet.body,
          image: tweet.image,
          created_at: tweet.created_at,
        }));
      }
      results.push(userTweets);
      if (user.following && user.following.length) {
        followingTweets = _.chain(user.following)
          .filter('active')
          .map(followingUser => {
            if (followingUser.tweets && followingUser.tweets.length) {
              return _.map(followingUser.tweets, tweet => ({
                id: tweet._id,
                name: followingUser.name,
                handle: followingUser.handle,
                likes_count: tweet.likes.length || 0,
                comments_count: tweet.comments.length || 0,
                retweet_count: tweet.retweets.length || 0,
                body: tweet.body,
                image: tweet.image,
                created_at: tweet.created_at,
              }));
            }
            return [];
          })
          .compact()
          .value();
      }
      results.push(followingTweets);
      results = _.chain(results)
        .flattenDeep()
        .value();
      results = results.sort((first, second) => moment(second.created_at).diff(first.created_at));
      callback(null, results);
    });
};

export default {
  handleRequest,
};
