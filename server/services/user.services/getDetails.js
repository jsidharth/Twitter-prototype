/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import moment from 'moment';
import _ from 'lodash';
import Promise from 'bluebird';
import Users from '../../models/user.model';
import Tweets from '../../models/tweet.model';

const handleRequest = (userId, callback) => {
  Users.findOne(
    { _id: userId },
    { bookmarks: 0, ownedLists: 0, subscribedLists: 0, __v: 0, updatedAt: 0 }
  )
    .populate('tweets')
    .populate('retweets')
    .populate('following')
    .populate('followers')
    .lean()
    .exec((err, result) => {
      if (err || result == null) {
        callback({ message: 'Fetch User Detail Failed!' }, null);
      } else {
        let dateExists = false;
        const todaysDate = moment().format('L');
        const viewsArray = result.views;
        if (viewsArray.length) {
          viewsArray.forEach(element => {
            const existingDate = moment(element.date).format('L');
            if (existingDate === todaysDate) {
              element.count_views += 1;
              dateExists = true;
            }
          });
        }
        if (!dateExists) {
          viewsArray.push({ date: todaysDate, count_views: 1 });
        }
        if (result.tweets && result.tweets.length) {
          result.tweets = result.tweets.map(tweet => ({
            userId: result._id,
            _id: tweet._id,
            name: result.name,
            handle: result.handle,
            likes_count: tweet.likes.length || 0,
            comments_count: tweet.comments.length || 0,
            retweet_count: tweet.retweets.length || 0,
            body: tweet.body,
            image: tweet.image,
            created_at: tweet.created_at,
            likes: tweet.likes,
            profilePic: result.profilePic,
          }));
        }
        // Populate retweets with parent tweet detail
        let reTweetsPromise = Promise.resolve();
        if (result.retweets && result.retweets.length) {
          reTweetsPromise = Promise.map(result.retweets, eachRetweet => {
            return Tweets.findOne({
              retweets: eachRetweet._id,
            }).then(parentTweet => {
              return Users.findOne({
                $or: [
                  {
                    tweets: parentTweet._id,
                  },
                  {
                    retweets: parentTweet._id,
                  },
                ],
              }).then(user => {
                return {
                  userId: user._id,
                  _id: eachRetweet._id,
                  name: user.name,
                  handle: user.handle,
                  likes_count: eachRetweet.likes.length || 0,
                  comments_count: eachRetweet.comments.length || 0,
                  retweet_count: eachRetweet.retweets.length || 0,
                  body: parentTweet.body,
                  image: parentTweet.image,
                  created_at: eachRetweet.created_at,
                  likes: eachRetweet.likes,
                  profilePic: user.profilePic,
                  retweet: {
                    name: result.name,
                    handle: result.handle,
                  },
                };
              });
            });
          });
        }
        reTweetsPromise.then(retweets => {
          result.retweets = retweets;
          // Update profile views for each date
          Users.findOneAndUpdate(
            { _id: userId },
            { views: viewsArray },
            {
              new: true,
            }
          ).exec(() => {});
          // Update views of tweets and retweets
          const combinedTweets = _.concat(
            _.map(result.tweets, '_id'),
            _.map(result.retweets, '_id')
          );
          callback(null, result);
          Promise.map(combinedTweets, eachTweet => {
            return Tweets.findByIdAndUpdate(eachTweet, {
              $inc: { views: 1 },
            }).then(() => {});
          }).then(() => {
            console.log('Updated views');
          });
        });
      }
    });
};

export default {
  handleRequest,
};
