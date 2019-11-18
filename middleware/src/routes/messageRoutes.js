import express from 'express';

const kafka = require('../../kafka/client');

const messageRouter = express.Router();

messageRouter.get('/messages/:userId', (req, res) => {
  const { userId } = req.params;
  kafka.makeRequest(
    'messageTopic',
    {
      userId,
      action: 'GET_MESSAGE_THREAD',
    },
    (err, result) => {
      if (err) {
        console.log('Error ', err);
        res.status(500).json({
          message: err.message,
        });
      } else {
        res.status(200).json(result);
      }
    }
  );
});

export default messageRouter;
