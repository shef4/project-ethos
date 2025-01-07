const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/config/database');
const seedDatabase = require('../src/utils/seed');

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Reset the database
  await seedDatabase(); // Seed initial data
});

afterAll(async () => {
  await sequelize.close(); // Close the database connection after tests
});

describe('Review API', () => {
  const newReview = {
    userId: 1,
    companyId: 1,
    rating: 4,
    comments: 'Good company!',
  };

  test('Should create a new review', async () => {
    const res = await request(app).post('/api/reviews/create').send(newReview);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('review');
    expect(res.body.review.rating).toBe(4);
  });

  test('Should fetch all reviews for a company', async () => {
    const res = await request(app).get('/api/reviews/company/1'); // Assuming company ID 1 exists
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('Should not create a review with invalid rating', async () => {
    const invalidReview = {
      userId: 1,
      companyId: 1,
      rating: 6, // Invalid rating (should be between 1 and 5)
      comments: 'Invalid rating test',
    };
    const res = await request(app).post('/api/reviews/create').send(invalidReview);
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Rating must be between 1 and 5');
  });
});