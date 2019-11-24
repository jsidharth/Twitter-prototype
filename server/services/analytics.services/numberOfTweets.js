import moment from 'moment';
import Users from '../../models/user.model';

const handleRequest = (userId, callback) => {
  Users.findOne({ _id: userId }, { tweets: 1 })
    .populate('tweets')
    .exec((err, result) => {
      if (err || !result) {
        callback({ message: 'Fetch number of tweets Failed!' }, null);
      } else {
        // number of tweets in the previous day
        const responseArray = [];
        let previousDayCount = 0;
        const previousDay = moment()
          .subtract(1, 'days')
          .format('L');
        result.tweets.forEach(tweetElement => {
          if (previousDay === moment(tweetElement.createdAt).format('L')) {
            previousDayCount += 1;
          }
        });
        // number of tweets in the previous month
        let previousMonthCount = 0;
        const dateArray = [];
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
        result.tweets.forEach(tweetElement => {
          if (
            startDate <= moment(tweetElement.createdAt).format('L') &&
            stopDate >= moment(tweetElement.createdAt).format('L')
          ) {
            previousMonthCount += 1;
          }
        });
        // number of tweets in the previous hour
        // Review this part
        let previousHourCount = 0;
        const startTime = moment().subtract({ hours: 1 });
        const endTime = moment();
        result.tweets.forEach(tweetElement => {
          if (
            startTime >= moment(tweetElement.createdAt) &&
            endTime <= moment(tweetElement.createdAt)
          ) {
            previousHourCount += 1;
          }
        });
        responseArray.push({ timeFrame: 'Hour', tweetCount: previousHourCount });
        responseArray.push({ timeFrame: 'Day', tweetCount: previousDayCount });
        responseArray.push({ timeFrame: 'Month', tweetCount: previousMonthCount });
        callback(null, responseArray);
      }
    });
};

export default {
  handleRequest,
};
