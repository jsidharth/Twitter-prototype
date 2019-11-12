import connection from './kafka/Connection';
// eslint-disable-next-line no-unused-vars
import mongoDBConnection from './config/mongoose';

// topics files
import * as userController from './controller/user.controller';

// eslint-disable-next-line no-unused-vars
function handleTopicRequest(topicName, fname) {
  const consumer = connection.getConsumer(topicName);
  const producer = connection.getProducer();
  console.log('server is running ');
  consumer.on('message', function(message) {
    console.log(`message received for ${topicName} `, fname);
    console.log(JSON.stringify(message.value));
    const data = JSON.parse(message.value);

    fname.handleRequest(data.data, function(err, res) {
      console.log(`after handle ${res}`);
      const payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      console.log(payloads);
      // eslint-disable-next-line no-shadow
      producer.send(payloads, function(err, data) {
        console.log(data);
      });
    });
  });
}

// Add your TOPICs here
// first argument is topic name
// second argument is a function that will handle this topic request
handleTopicRequest('userTopic', userController);
