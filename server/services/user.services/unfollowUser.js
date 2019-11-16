/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import Users from '../../models/user.model';

const handleRequest = (payload, callback) => {
  const { userId, followerId } = payload;
  // Find the current user
  Users.findById(userId).then(user => {
    if (!user) {
      callback(
        {
          message: 'User not found!',
        },
        null
      );
    } else {
      // Find the user whom the current user wishes to unfollow
      Users.findById(followerId).then(followingUser => {
        if (!followingUser) {
          callback(
            {
              message: 'User not found!',
            },
            null
          );
        } else {
          user.following = _.filter(user.following, eachUser => eachUser.toString() !== followerId);
          followingUser.followers = _.filter(
            followingUser.followers,
            eachUser => eachUser.toString() !== userId
          );
          Promise.all([user.save(), followingUser.save()]).then(() => {
            callback(null, {
              message: 'Unfollowed',
            });
          });
        }
      });
    }
  });
};

export default {
  handleRequest,
};
