import Sequelize from 'sequelize';
import UserModel from '../models/user.sql';

const sequelize = new Sequelize('twitterDB', 'root', 'root.1234', {
  host: 'twitterdb.cv9vraaep5ay.us-west-2.rds.amazonaws.com',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

const Users = UserModel(sequelize, Sequelize);

sequelize
  .sync()
  .then(() => {
    console.log('DB Created Successfully...');
  })
  .catch(err => {
    console.log('DB Creation Error: ', err.message);
  });

// eslint-disable-next-line import/prefer-default-export
export { Users };
