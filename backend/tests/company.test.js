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

describe('Company API', () => {
  const testCompany = {
    name: 'New Company',
    industry: 'Tech',
    description: 'A tech company for testing.',
  };

  test('Should create a new company', async () => {
    const res = await request(app).post('/api/companies').send(testCompany);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('company');
    expect(res.body.company.name).toBe(testCompany.name);
  });

  test('Should fetch company details', async () => {
    const res = await request(app).get('/api/companies/1'); // Assuming company ID 1 exists
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name', 'Test Company 1');
  });

  test('Should return 404 for non-existent company', async () => {
    const res = await request(app).get('/api/companies/999'); // Non-existent company ID
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error', 'Company not found');
  });
});