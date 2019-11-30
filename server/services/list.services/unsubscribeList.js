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
        message: 'You cannot unsubscribe from your own list!',
      },
      null
    );
  } else if (!_.find(user.subscribedLists, new ObjectId(listDetails.listId))) {
    callback(
      {
        message: 'You are not subscribed to this list!',
      },
      null
    );
  } else {
    user.subscribedLists.pull(listDetails.listId);
    user.save();
    callback(null, {
      message: 'Unsubscribed from List',
    });
  }
};

export default {
  handleRequest,
};
