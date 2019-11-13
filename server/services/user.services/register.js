import jwt from 'jsonwebtoken';
import moment from 'moment';
import Users from '../../models/user.model';
import jwtSecret from '../../config/jwtConfig';

const handleRequest = async (userDetails, callback) => {
  const newUser = await Users.create({
    email: userDetails.email,
    name: userDetails.name,
    dob: userDetails.dob,
    handle: userDetails.handle,
  });
  if (!newUser) {
    callback(
      {
        message: 'User register failed!',
      },
      null
    );
  } else {
    const token = jwt.sign(
      {
        // eslint-disable-next-line no-underscore-dangle
        _id: newUser._id,
      },
      jwtSecret.secret
    );
    callback(null, {
      // eslint-disable-next-line no-underscore-dangle
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      dob: moment(newUser.dob).format('MM-DD-YYYY'),
      token,
    });
  }
};

export default {
  handleRequest,
};
