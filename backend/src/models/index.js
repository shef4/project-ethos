const User = require('./User');
const Company = require('./Company');
const Review = require('./Review');
const sequelize = require('../config/database'); // Your Sequelize instance

module.exports = {
  User,
  Company,
  Review,
  sequelize,
};