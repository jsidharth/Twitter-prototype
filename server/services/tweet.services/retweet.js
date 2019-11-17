/* eslint-disable no-underscore-dangle */
import Users from '../../models/user.model';
import Tweets from '../../models/tweet.model';

const handleRequest = (retweetDetails, callback) => {
  const { tweetId, userId } = retweetDetails;
  Tweets.findById(tweetId).then(tweet => {
    if (!tweet) {
      callback(
        {
          message: 'Tweet not found!',
        },
        null
      );
    } else {
      const { body, image, hashtags } = tweet;
      Tweets.create({
        body,
        image,
        hashtags,
      }).then(retweet => {
        if (!retweet) {
          callback(
            {
              message: 'Tweet creation failed!',
            },
            null
          );
        } else {
          // Add retweet to the tweet
          Tweets.findByIdAndUpdate(
            {
              _id: tweet._id,
            },
            {
              $addToSet: {
                retweets: retweet._id,
              },
            }
          ).then(addRetweet => {
            if (!addRetweet) {
              callback(
                {
                  message: 'Tweet creation failed!',
                },
                null
              );
            } else {
              // Add retweet to current user
              Users.findById(userId).then(user => {
                if (!user) {
                  callback(
                    {
                      message: 'Invalid user!',
                    },
                    null
                  );
                } else {
                  Users.findByIdAndUpdate(
                    {
                      _id: user._id,
                    },
                    {
                      $addToSet: {
                        retweets: retweet._id,
                      },
                    }
                  ).then(updatedUser => {
                    if (!updatedUser) {
                      callback(
                        {
                          message: 'Invalid user!',
                        },
                        null
                      );
                    } else {
                      callback(null, {
                        message: 'Retweeted!',
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
};

export default {
  handleRequest,
};
