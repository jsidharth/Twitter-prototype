import Messages from '../../models/message.model';

const handleRequest = async (messageDetails, callback) => {
  let messageThread = await Messages.findOne({
    $and: [
      {
        $or: [
          {
            user_1: messageDetails.user_1,
          },
          {
            user_1: messageDetails.user_2,
          },
        ],
      },
      {
        $or: [
          {
            user_2: messageDetails.user_1,
          },
          {
            user_2: messageDetails.user_2,
          },
        ],
      },
    ],
  })
    .populate('user_1')
    .populate('user_2');
  if (!messageThread) {
    await Messages.create({
      user_1: messageDetails.user_1,
      user_2: messageDetails.user_2,
    });
    callback(null, {
      message: 'Message thread created',
    });
  } else {
    if (messageDetails.sender && messageDetails.body) {
      messageThread.messages.push({
        sender: messageDetails.sender,
        body: messageDetails.body,
        createdAt: new Date(),
      });
      messageThread = await messageThread.save();
    }
    callback(null, messageThread);
  }
};

export default {
  handleRequest,
};
