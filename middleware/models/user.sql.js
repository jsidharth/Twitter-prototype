const userModel = (sequelize, type) => {
  return sequelize.define('user', {
    email: {
      type: type.STRING,
      allowNull: false,
    },
    password: {
      type: type.STRING,
      allowNull: false,
    },
    handle: {
      type: type.STRING,
      allowNull: false,
    },
  });
};

export default userModel;
