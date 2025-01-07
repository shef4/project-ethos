const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your sequelize instance

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;