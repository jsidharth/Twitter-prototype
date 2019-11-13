import jwt from 'jsonwebtoken';
import moment from 'moment';
import Users from '../../models/user.model';
import jwtSecret from '../../config/jwtConfig';

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
  }
  const token = jwt.sign(
    {
      // eslint-disable-next-line no-underscore-dangle
      _id: user._id,
    },
    jwtSecret.secret
  );

  callback(null, {
    // eslint-disable-next-line no-underscore-dangle
    _id: user._id,
    name: user.name,
    email: user.email,
    dob: moment(user.dob).format('MM-DD-YYYY'),
    token,
  });
};

// eslint-disable-next-line import/prefer-default-export
export default {
  handleRequest,
};
