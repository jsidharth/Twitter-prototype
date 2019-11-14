import Sequelize from 'sequelize';
import UserModel from '../models/user.sql';

const sequelize = new Sequelize('twitterDB', 'root', 'root123', {
  host: 'localhost',
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

export { Users };
