/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import Promise from 'bluebird';
import Users from '../../models/user.model';

const handleRequest = async (userId, callback) => {
  const user = await Users.findById(userId)
    .populate('ownedLists')
    .populate('subscribedLists');
  if (!user) {
    callback(
      {
        message: 'User not found!',
      },
      null
    );
  } else {
    const { subscribedLists } = user;
    if (subscribedLists && subscribedLists.length) {
      const updatedsubscribedLists = await Promise.map(subscribedLists, async list => {
        const listUser = await Users.findOne(
          {
            ownedLists: list._id,
          },
          {
            name: 1,
            handle: 1,
            profilePic: 1,
          }
        );
        if (!listUser) {
          callback(
            {
              message: 'Could not map list to user!',
            },
            null
          );
        } else {
          return {
            _id: list._id,
            name: list.name,
            description: list.description,
            members: list.members,
            userName: listUser.name,
            userHandle: listUser.handle,
          };
        }
      });
      callback(null, {
        ownedLists: user.ownedLists,
        subscribedLists: updatedsubscribedLists,
      });
    } else {
      callback(null, {
        ownedLists: user.ownedLists,
        subscribedLists: user.subscribedLists,
      });
    }
  }
};

export default {
  handleRequest,
};
