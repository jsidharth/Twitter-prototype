import moment from 'moment';
import Users from '../../models/user.model';

const handleRequest = (userId, callback) => {
  Users.findOne(
    { _id: userId },
    { bookmarks: 0, ownedLists: 0, subscribedLists: 0, __v: 0, updatedAt: 0 }
  )
    .populate('tweets')
    .populate('retweets')
    .exec((err, result) => {
      if (err || result == null) {
        callback({ message: 'Fetch User Detail Failed!' }, null);
      } else {
        let dateExists = false;
        const todaysDate = moment().format('L');
        let viewsArray = result.views;
        if (viewsArray.length) {
          viewsArray.forEach(element => {
            const existingDate = moment(element.date).format('L');
            if (existingDate === todaysDate) {
              element.count_views += 1;
              dateExists = true;
            }
          });
        }
        if (!dateExists) {
          viewsArray.push({ date: todaysDate, count_views: 1 });
        }
        Users.findOneAndUpdate(
          { _id: userId },
          { views: viewsArray },
          {
            new: true,
          }
        ).exec((err, result) => {});
        callback(null, result);
      }
    });
};

export default {
  handleRequest,
};
