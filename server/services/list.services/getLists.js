/* eslint-disable no-underscore-dangle */
import Users from '../../models/user.model';

const handleRequest = async (userId, callback) => {
  const user = await Users.findById(userId)
    .populate('ownedLists')
    .populate('subscribedLists');
  if (!user) {
    callback({ message: 'User not found!' }, null);
  } else {
    callback(null, {
      ownedList: user.ownedLists,
      subscribedLists: user.subscribedLists,
    });
  }
};

export default {
  handleRequest,
};
