/* eslint-disable no-underscore-dangle */
import Users from '../../models/user.model';

const handleRequest = async (payload, callback) => {
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
      // Find the user whom the current user wishes to follow
      Users.findById(followerId).then(followingUser => {
        if (!followingUser) {
          callback(
            {
              message: 'User not found!',
            },
            null
          );
        } else {
          user.following.push(followingUser._id);
          followingUser.followers.push(user._id);
          Promise.all([user.save(), followingUser.save()]).then(() => {
            callback(null, {
              message: 'Followed',
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
