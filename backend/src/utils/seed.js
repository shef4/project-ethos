const User = require('../models/User');
const Company = require('../models/Company');
const Review = require('../models/Review');
const bcrypt = require('bcrypt');

const seedDatabase = async () => {
  // Create multiple users
  const users = await Promise.all([
    User.create({
      email: 'testuser1@example.com',
      username: 'testuser1',
      passwordHash: await bcrypt.hash('password123', 10), // Hash the password
    }),
    User.create({
      email: 'testuser2@example.com',
      username: 'testuser2',
      passwordHash: await bcrypt.hash('password456', 10),
    }),
    User.create({
      email: 'testuser3@example.com',
      username: 'testuser3',
      passwordHash: await bcrypt.hash('password789', 10),
    }),
  ]);

  // Create multiple companies
  const companies = await Promise.all([
    Company.create({
      name: 'Test Company 1',
      industry: 'Software',
      description: 'A great software company.',
    }),
    Company.create({
      name: 'Test Company 2',
      industry: 'Marketing',
      description: 'A marketing company used for testing.',
    }),
  ]);

  // Create multiple reviews
  await Promise.all([
    Review.create({
      userId: users[0].id,
      companyId: companies[0].id,
      rating: 4.5,
      comments: 'Amazing software experience!',
    }),
    Review.create({
      userId: users[1].id,
      companyId: companies[0].id,
      rating: 3.0,
      comments: 'The service was okay but could be improved.',
    }),
    Review.create({
      userId: users[2].id,
      companyId: companies[1].id,
      rating: 5.0,
      comments: 'Outstanding customer support!',
    }),
  ]);

  console.log('Database seeded successfully!');
};

module.exports = seedDatabase;