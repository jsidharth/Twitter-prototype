import Messages from '../../models/message.model';

const handleRequest = async (userId, callback) => {
  const messageThreads = await Messages.find({
    $or: [{ user_1: userId }, { user_2: userId }],
  });
  if (!messageThreads) {
    callback({ message: 'No messages found' }, null);
  } else{
      
  }
};

export default {
  handleRequest,
};
