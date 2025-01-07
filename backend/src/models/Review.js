const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Company = require('./Company');

const Review = sequelize.define('Review', {
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  comments: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
});

// Associations
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

Company.hasMany(Review, { foreignKey: 'companyId' });
Review.belongsTo(Company, { foreignKey: 'companyId' });

module.exports = Review;