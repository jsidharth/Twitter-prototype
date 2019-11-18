import Messages from '../../models/message.model';

const handleRequest = (userId, callback) => {
  Messages.findOne({ _id: userId }).exec((err, result) => {
    if (err || result == null) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

export default {
  handleRequest,
};
