import Users from '../../models/user.model';

const handleRequest = (userId, callback) => {
  Users.populate("tweets").
  //Users.aggregate([{"$project" : {"count":{"$size":"$"}}}])
};

export default {
  handleRequest,
};
