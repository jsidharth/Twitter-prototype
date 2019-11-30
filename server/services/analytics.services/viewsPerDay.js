/* eslint-disable no-param-reassign */
import moment from 'moment';
import Users from '../../models/user.model';

const handleRequest = (userId, callback) => {
  Users.findOne(
    {
      _id: userId,
    },
    {
      views: 1,
    }
  ).exec((err, result) => {
    if (err || !result) {
      callback(
        {
          message: 'Fetch users view per day Failed!',
        },
        null
      );
    } else {
      const dateArray = [];
      const startDate = moment()
        .subtract(1, 'month')
        .format('L');
      const stopDate = moment().format('L');
      let currentDate = startDate;
      while (currentDate <= stopDate) {
        const dateCountObject = {
          date: currentDate,
          profileViewCount: 0,
        };
        dateArray.push(dateCountObject);
        currentDate = moment(new Date(currentDate))
          .add(1, 'days')
          .format('L');
      }
      result.views.forEach(viewsElement => {
        dateArray.forEach(dateArrayElement => {
          if (dateArrayElement.date === moment(viewsElement.date).format('L')) {
            dateArrayElement.profileViewCount = viewsElement.count_views;
          }
        });
      });
      callback(null, dateArray);
    }
  });
};

export default {
  handleRequest,
};
