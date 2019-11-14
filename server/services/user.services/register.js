import jwt from 'jsonwebtoken';
import moment from 'moment';
import random from 'random';

import Users from '../../models/user.model';
import jwtSecret from '../../config/jwtConfig';

const handleRequest = async (userDetails, callback) => {
  let randomNumber;
  let user;
  let randomHandle;
  const firstName = userDetails.name.split(' ')[0];
  do {
    // eslint-disable-next-line no-undef
    randomNumber = random.int(1, 1000);
    randomHandle = firstName + randomNumber;
    // eslint-disable-next-line no-await-in-loop
    user = await Users.findOne({
      handle: randomHandle,
    });
  } while (user);
  const newUser = await Users.create({
    email: userDetails.email,
    name: userDetails.name,
    dob: userDetails.dob,
    handle: randomHandle,
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
      handle: newUser.handle,
      token,
    });
  }
};

export default {
  handleRequest,
};
