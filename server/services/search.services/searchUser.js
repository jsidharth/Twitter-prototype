import _ from 'lodash';
import Users from '../../models/user.model';

const handleRequest = async (searchTerm, callback) => {
  let users = await Users.aggregate([
    {
      $match: {
        handle: {
          $regex: searchTerm,
          $options: 'i',
        },
      },
    },
    {
      $project: {
        name: 1,
        bio: 1,
        handle: 1,
        profilePic: 1,
        active: 1,
      },
    },
  ]);
  users = _.chain(users).filter('active');
  callback(null, {
    users,
  });
};

export default {
  handleRequest,
};
