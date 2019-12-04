import moment from 'moment';
import random from 'random';

import Users from '../../models/user.model';

const handleRequest = async (userDetails, callback) => {
  let randomNumber;
  let user;
  let randomHandle;
  const firstName = userDetails.name.split(' ')[0]; // extracts the first name of user
  do {
    // eslint-disable-next-line no-undef
    randomNumber = random.int(1, 1000); // generates random number for use in handle
    randomHandle = firstName.toLowerCase() + randomNumber;
    // eslint-disable-next-line no-await-in-loop
    user = await Users.findOne({
      handle: randomHandle,
    }); // checks whether the handle already exists in backend
  } while (user); // if handle exists, restart loop
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
    callback(null, {
      // eslint-disable-next-line no-underscore-dangle
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      dob: moment(newUser.dob).format('MM-DD-YYYY'),
      active: newUser.active,
      bookmarks: newUser.bookmarks,
      profilePic: newUser.profilePic,
      handle: newUser.handle,
      subscribedLists: newUser.subscribedLists,
    });
  }
};

export default {
  handleRequest,
};
