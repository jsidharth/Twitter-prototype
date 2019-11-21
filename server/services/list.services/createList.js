/* eslint-disable consistent-return */
import Lists from '../../models/list.model';

const handleRequest = async (listDetails, callback) => {
  const newList = await Lists.create({
    name: listDetails.name,
    description: listDetails.description,
    private: listDetails.private,
    members: listDetails.members,
  });
  if (!newList) {
    callback(
      {
        message: 'List creation error!',
      },
      null
    );
  } else {
    callback(null, newList);
  }
};

// eslint-disable-next-line import/prefer-default-export
export default {
  handleRequest,
};
