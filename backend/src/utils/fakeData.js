const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Company = require('../models/Company');
const Review = require('../models/Review');

const createFakeData = async () => {
  try {
    console.log('Starting fake data generation...');

    // Clear existing data if needed (optional)
    await Review.destroy({ where: {} });
    await Company.destroy({ where: {} });
    await User.destroy({ where: {} });

    // Create 10 fake users with hashed passwords
    for (let i = 0; i < 10; i++) {
      await User.create({
        email: faker.internet.email(),
        username: faker.internet.userName(),
        passwordHash: await bcrypt.hash(faker.internet.password(10), 10), // Hashing password
      });
    }

    // Create 10 fake companies
    for (let i = 0; i < 10; i++) {
      await Company.create({
        name: faker.company.name(),
        industry: faker.commerce.department(),
        description: faker.company.catchPhrase(),
      });
    }

    // Create 20 fake reviews
    const users = await User.findAll();
    const companies = await Company.findAll();

    for (let i = 0; i < 20; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomCompany = companies[Math.floor(Math.random() * companies.length)];

      await Review.create({
        userId: randomUser.id,
        companyId: randomCompany.id,
        rating: faker.datatype.float({ min: 1, max: 5, precision: 0.1 }),
        comments: faker.lorem.paragraph(),
      });
    }

    console.log('Fake data created successfully.');
  } catch (error) {
    console.error('Error creating fake data:', error.message || error);
  }
};

module.exports = createFakeData;