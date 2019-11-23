/* eslint-disable no-underscore-dangle */
import Users from '../../models/user.model';
import Lists from '../../models/list.model';

const handleRequest = async (listDetails, callback) => {
  const list = await Lists.create({
    name: listDetails.name,
    description: listDetails.description,
    private: listDetails.private,
    members: listDetails.members,
  });
  if (!list) {
    callback(
      {
        message: 'List not created!',
      },
      null
    );
  } else {
    const user = await Users.findOneAndUpdate(
      {
        _id: listDetails.userId,
      },
      {
        $push: {
          ownedLists: list._id,
        },
      }
    );
    if (!user) {
      callback(
        {
          message: 'Could not update user with created list!',
        },
        null
      );
    } else {
      callback(null, {
        message: 'List Created',
      });
    }
  }
};

export default {
  handleRequest,
};
