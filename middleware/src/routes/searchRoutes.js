import express from 'express';

const kafka = require('../../kafka/client');

const searchRouter = express.Router();

searchRouter.get('/:searchTerm', (req, res) => {
  console.log('Inside GET Search');
  console.log('Request Body: ', req.params);
  const { searchTerm } = req.params;
  console.log('HERE:', searchTerm);
  switch (searchTerm.split('')[0]) {
    case '@':
      kafka.makeRequest(
        'searchTopic',
        {
          body: searchTerm.substring(1),
          action: 'SEARCH_USER',
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
      break;
    case '#':
      kafka.makeRequest(
        'searchTopic',
        {
          body: searchTerm.substring(1),
          action: 'SEARCH_TOPIC',
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
      break;
    default:
      kafka.makeRequest(
        'searchTopic',
        {
          body: searchTerm,
          action: 'SEARCH_ALL',
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
      break;
  }
});

export default searchRouter;
