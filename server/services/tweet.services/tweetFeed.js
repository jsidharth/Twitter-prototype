/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import moment from 'moment';
import Promise from 'bluebird';
import Users from '../../models/user.model';
import Tweets from '../../models/tweet.model';

const handleRequest = (params, callback) => {
  Users.findById(params.userId)
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
          userId: user._id,
          _id: tweet._id,
          name: user.name,
          handle: user.handle,
          likes_count: tweet.likes.length || 0,
          comments_count: tweet.comments.length || 0,
          retweet_count: tweet.retweets.length || 0,
          body: tweet.body,
          image: tweet.image,
          created_at: tweet.createdAt,
          likes: tweet.likes,
          profilePic: user.profilePic,
        }));
      }
      results.push(userTweets);
      if (user.following && user.following.length) {
        followingTweets = _.chain(user.following)
          .filter('active')
          .map(followingUser => {
            if (followingUser.tweets && followingUser.tweets.length) {
              return _.map(followingUser.tweets, tweet => ({
                userId: followingUser._id,
                _id: tweet._id,
                name: followingUser.name,
                handle: followingUser.handle,
                likes_count: tweet.likes.length || 0,
                comments_count: tweet.comments.length || 0,
                retweet_count: tweet.retweets.length || 0,
                body: tweet.body,
                image: tweet.image,
                created_at: tweet.createdAt,
                likes: tweet.likes,
                profilePic: followingUser.profilePic,
                bookmarks: followingUser.bookmarks,
              }));
            }
            return [];
          })
          .compact()
          .value();
      }
      results.push(followingTweets);
      results = _.chain(results)
        .compact()
        .flattenDeep()
        .value();
      const size = results.length || 0;
      // Splice based on the offset and count for pagination
      results =
        results && results.length
          ? results
              .sort((first, second) => moment(second.created_at).diff(first.created_at))
              .splice(params.offset, params.count)
          : [];
      callback(null, { results, size });
      let updateTweetViewsPromise = Promise.resolve();
      if (results && results.length) {
        updateTweetViewsPromise = Promise.map(results, tweet => {
          return Tweets.findOneAndUpdate(
            {
              _id: tweet._id,
            },
            {
              $inc: {
                views: 1,
              },
            }
          );
        });
      }
      updateTweetViewsPromise.then(() => {
        console.log('Views updated!');
      });
    });
};

export default {
  handleRequest,
};
