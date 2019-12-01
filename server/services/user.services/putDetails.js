/* eslint-disable no-underscore-dangle */
import Users from '../../models/user.model';
import getDetails from './getDetails';

const handleRequest = (userDetails, callback) => {
  const updateData = {
    name: userDetails.name,
    dob: userDetails.dob,
    profilePic: userDetails.profilePic,
    bio: userDetails.bio,
    location: userDetails.location,
    website: userDetails.website,
  };

  // eslint-disable-next-line no-underscore-dangle
  Users.findOneAndUpdate(
    {
      _id: userDetails._id,
    },
    updateData,
    {
      new: true,
    }
  ).exec((err, user) => {
    if (err || user == null) {
      callback(err, null);
    } else {
      getDetails.handleRequest(user._id, callback);
    }
  });
};

export default {
  handleRequest,
};
