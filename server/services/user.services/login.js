import moment from 'moment';
import Users from '../../models/user.model';

const handleRequest = async (userDetails, callback) => {
  const user = await Users.findOne({
    email: userDetails.email,
  });
  if (!user) {
    callback(
      {
        message: 'User not registered',
      },
      null
    );
  } else {
    user.active = true;
    await user.save();
    callback(null, {
      // eslint-disable-next-line no-underscore-dangle
      _id: user._id,
      name: user.name,
      email: user.email,
      dob: moment(user.dob).format('MM-DD-YYYY'),
      active: user.active,
    });
  }
};

// eslint-disable-next-line import/prefer-default-export
export default {
  handleRequest,
};
