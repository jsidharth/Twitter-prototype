import Messages from '../../models/message.model';

const handleRequest = async (messageDetails, callback) => {
  let messageThread;
  if (messageDetails.actionType === 'COMPOSE') {
    messageThread = await Messages.create({
      user_1: messageDetails.user_1,
      user_2: messageDetails.user_2,
      messages: [
        {
          sender: messageDetails.sender,
          body: messageDetails.body,
          createdAt: new Date(),
        },
      ],
    });
    callback(null, { message: 'Message thread created' });
  } else {
    messageThread = await Messages.findOne({
      $and: [
        { $or: [{ user_1: messageDetails.user_1 }, { user_1: messageDetails.user_2 }] },
        { $or: [{ user_2: messageDetails.user_1 }, { user_2: messageDetails.user_2 }] },
      ],
    });
    if (!messageThread) {
      callback(
        {
          message: 'Message Thread not found',
        },
        null
      );
    } else {
      messageThread.messages.push({
        sender: messageDetails.sender,
        body: messageDetails.body,
        createdAt: new Date(),
      });
      messageThread.save();
      callback(null, messageThread);
    }
  }
};

export default {
  handleRequest,
};
