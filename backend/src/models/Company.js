const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Company = sequelize.define('Company', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  industry: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = Company;