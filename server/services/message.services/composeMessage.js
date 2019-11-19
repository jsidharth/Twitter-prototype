import Users from '../../models/user.model';
import Messages from '../../models/message.model';

const handleRequest = async (messageDetails, callback) => {
  const message = await Messages.create({
    to: messageDetails.to,
    from: messageDetails.from,
    body: messageDetails.body
  });
  const user = await Users.findById(messageDetails.userId);
  if (!user) {
    callback({ message: 'User not found!' }, null);
  } 
}
//   else {}
    // eslint-disable-next-line no-underscore-dangle

//We should have messages in User. To push messageid to the thread
//     user.push(tweet._id);
//     await user.save();
//     callback(null, {
//       message: 'Tweet Posted',
//     });
//   }
//};

export default {
  handleRequest
}
