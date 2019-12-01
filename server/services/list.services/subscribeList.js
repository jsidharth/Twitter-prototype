/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import mongoose from 'mongoose';
import Users from '../../models/user.model';

const { ObjectId } = mongoose.Types;

const handleRequest = async (listDetails, callback) => {
  const user = await Users.findById(listDetails.userId);
  if (!user) {
    callback(
      {
        message: 'User not found',
      },
      null
    );
  } else if (_.find(user.ownedLists, new ObjectId(listDetails.listId))) {
    callback(
      {
        message: 'You cannot subscribe to your own list!',
      },
      null
    );
  } else if (_.find(user.subscribedLists, new ObjectId(listDetails.listId))) {
    callback(
      {
        message: 'You have already subscribed to the list!',
      },
      null
    );
  } else {
    user.subscribedLists.addToSet(listDetails.listId);
    user.save();
    callback(null, user.subscribedLists);
  }
};

export default {
  handleRequest,
};
