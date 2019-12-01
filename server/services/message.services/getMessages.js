import moment from 'moment';
import Messages from '../../models/message.model';

const handleRequest = async (userId, callback) => {
  let results = await Messages.find({
    $or: [
      {
        user_1: userId,
      },
      {
        user_2: userId,
      },
    ],
  })
    .populate({
      path: 'user_1',
      select: 'name handle profilePic ',
    })
    .populate({
      path: 'user_2',
      select: 'name handle profilePic ',
    });
  if (results && results.length) {
    results = results.sort((second, first) => moment(second.createdAt).diff(first.createdAt));
  }
  callback(null, results);
};

export default {
  handleRequest,
};
