import moment from 'moment';
import Tweets from '../../models/tweet.model';

const handleRequest = callback => {
  Tweets.find({}).exec((err, result) => {
    if (err || !result) {
      callback(
        {
          message: 'Fetch number of tweets Failed!',
        },
        null
      );
    } else {
      // number of tweets in the previous day
      const responseArray = [];
      const dateArray = [];
      let previousDayCount = 0;
      let previousMonthCount = 0;
      let previousHourCount = 0;
      const startTime = moment().subtract({
        hours: 1,
      });
      const endTime = moment();
      const presentDay = moment().format('L');
      const startDate = moment()
        .subtract(1, 'month')
        .format('L');
      const stopDate = moment().format('L');
      let currentDate = startDate;
      while (currentDate <= stopDate) {
        dateArray.push(currentDate);
        currentDate = moment(new Date(currentDate))
          .add(1, 'days')
          .format('L');
      }
      result.forEach(tweetElement => {
        if (presentDay === moment(tweetElement.createdAt).format('L')) {
          previousDayCount += 1;
        }
        if (
          startDate <= moment(tweetElement.createdAt).format('L') &&
          stopDate >= moment(tweetElement.createdAt).format('L')
        ) {
          previousMonthCount += 1;
        }
        if (
          startTime <= moment(tweetElement.createdAt) &&
          endTime >= moment(tweetElement.createdAt)
        ) {
          previousHourCount += 1;
        }
      });
      responseArray.push({
        timeFrame: 'Hour',
        tweetCount: previousHourCount,
      });
      responseArray.push({
        timeFrame: 'Day',
        tweetCount: previousDayCount,
      });
      responseArray.push({
        timeFrame: 'Month',
        tweetCount: previousMonthCount,
      });
      callback(null, responseArray);
    }
  });
};

export default {
  handleRequest,
};
