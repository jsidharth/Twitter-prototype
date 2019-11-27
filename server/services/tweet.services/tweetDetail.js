/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import Promise from 'bluebird';
import mongoose from 'mongoose';
import Users from '../../models/user.model';
import Tweets from '../../models/tweet.model';

const { ObjectId } = mongoose.Types;

const handleRequest = (tweetId, callback) => {
  Tweets.findById(tweetId)
    .populate('comments')
    .then(tweet => {
      if (!tweet) {
        callback(
          {
            message: 'Tweet not found!',
          },
          null
        );
      } else {
        // Find the user details of the tweet
        Users.findOne(
          {
            tweets: tweet._id,
          },
          {
            name: 1,
            handle: 1,
            profilePic: 1,
          }
        ).then(user => {
          const tweetDetails = {
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
          };
          let tweetCommentPromise = Promise.resolve();
          if (tweet.comments && tweet.comments.length) {
            tweetCommentPromise = Promise.map(tweet.comments, comment => {
              return Users.findOne(
                {
                  tweets: comment._id,
                },
                {
                  name: 1,
                  handle: 1,
                  profilePic: 1,
                }
              ).then(commentUser => {
                return {
                  _id: comment._id,
                  name: commentUser.name,
                  handle: commentUser.handle,
                  likes_count: comment.likes.length || 0,
                  comments_count: comment.comments.length || 0,
                  retweet_count: comment.retweets.length || 0,
                  body: comment.body,
                  image: comment.image,
                  created_at: comment.createdAt,
                  likes: tweet.likes,
                  profilePic: commentUser.profilePic,
                };
              });
            });
          }
          tweetCommentPromise.then(comments => {
            tweetDetails.comments = comments;
            // Update the tweet views for every tweet
            let combinedTweets = [];
            combinedTweets.push(tweetDetails._id.toString());
            if (tweetDetails.comments && tweetDetails.comments.length) {
              combinedTweets = _.concat(
                combinedTweets,
                _.chain(tweetDetails.comments)
                  .map(mapEachTweet => mapEachTweet._id.toString())
                  .value()
              );
            }
            let updateTweetViewsPromise = Promise.resolve();
            if (combinedTweets && combinedTweets.length) {
              updateTweetViewsPromise = Promise.map(combinedTweets, eachTweetId => {
                return Tweets.findOneAndUpdate(
                  { _id: new ObjectId(eachTweetId) },
                  { $inc: { views: 1 } }
                );
              });
            }
            updateTweetViewsPromise.then(() => {
              callback(null, tweetDetails);
            });
          });
        });
      }
    });
};

export default {
  handleRequest,
};
