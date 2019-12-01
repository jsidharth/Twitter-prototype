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
    let previouslyActive = true;
    if (!user.active) {
      previouslyActive = false;
    }
    user.active = true;
    await user.save();
    callback(null, {
      // eslint-disable-next-line no-underscore-dangle
      _id: user._id,
      name: user.name,
      email: user.email,
      dob: moment(user.dob).format('MM-DD-YYYY'),
      active: user.active,
      bookmarks: user.bookmarks,
      profilePic: user.profilePic,
      handle: user.handle,
      subscribedLists: user.subscribedLists,
      previousState: previouslyActive,
    });
  }
};

// eslint-disable-next-line import/prefer-default-export
export default {
  handleRequest,
};
