const { faker } = require('@faker-js/faker');
const User = require('../models/User');
const Company = require('../models/Company');
const Review = require('../models/Review');

const createFakeData = async () => {
  try {
    // Create 10 fake users
    for (let i = 0; i < 10; i++) {
      await User.create({
        email: faker.internet.email(),
        username: faker.internet.username(), // Updated method
        passwordHash: faker.internet.password(),
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
        rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }), // Updated method
        comments: faker.lorem.sentences(3),
      });
    }

    console.log('Fake data created successfully.');
  } catch (error) {
    console.error('Error creating fake data:', error);
  }
};

module.exports = createFakeData;