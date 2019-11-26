import Users from '../../models/user.model';

const handleRequest = async (searchTerm, callback) => {
  const users = await Users.aggregate([
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
      },
    },
  ]);
  callback(null, users);
};

export default {
  handleRequest,
};
