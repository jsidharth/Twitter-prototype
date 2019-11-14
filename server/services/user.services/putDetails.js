/* eslint-disable no-underscore-dangle */
import Users from '../../models/user.model';

const handleRequest = (userDetails, callback) => {
  const updateData = {
    name: userDetails.name,
    email: userDetails.email,
    dob: userDetails.dob,
    profilePic: userDetails.profilePic,
    bio: userDetails.bio,
    location: userDetails.location,
    website: userDetails.website,
    handle: userDetails.handle,
  };

  Users.findOneAndUpdate({ _id: userDetails._id }, updateData, { new: true }).exec(
    (err, result) => {
      if (err || result == null) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  );
};

export default {
  handleRequest,
};
