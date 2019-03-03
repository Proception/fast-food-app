import { Sequelize } from 'sequelize';
import { sequelizeconn } from '../index';

const User = sequelizeconn.define('users', {
  email: Sequelize.STRING,
  full_name: Sequelize.STRING,
  phone_no: Sequelize.STRING,
  password: Sequelize.STRING,
  date_created: Sequelize.STRING,
  role_id: Sequelize.STRING,

}, {
  timestamps: false,
});

User.sync().then(() => {
  console.log('Test Data : ', User.findAll().then((users) => {
    console.log('My users : ', users);
  }));
});

module.exports = {
  usermodel: User,
};
