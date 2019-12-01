import Users from '../../models/user.model';

const handleRequest = async (userId, callback) => {
  const user = await Users.findById(userId);
  if (!user) {
    callback(
      {
        message: 'User not found in DB!',
      },
      null
    );
  } else {
    user.active = false;
    const updatedUser = await user.save();
    if (updatedUser.active === true) {
      callback(
        {
          message: 'Account Deactivation Failed!',
        },
        null
      );
    } else {
      callback(null, {
        message: 'Account Deactivation Successful!',
      });
    }
  }
};

export default {
  handleRequest,
};
