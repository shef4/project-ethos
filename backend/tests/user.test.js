const request = require('supertest');
const app = require('../src/app');
const { User, sequelize } = require('../src/models');
const bcrypt = require('bcrypt');

// Seed database before running tests
const seedDatabase = async () => {
  await User.create({
    email: 'testuser@example.com',
    username: 'testuser',
    passwordHash: await bcrypt.hash('password123', 10),
  });
};

describe('User API', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await seedDatabase();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('Should register a new user', async () => {
    const newUser = {
      email: 'newuser@example.com',
      username: 'newuser',
      password: 'password123',
    };

    const res = await request(app).post('/api/users/register').send(newUser);
    console.log('Register response:', res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('user');
  });

  test('Should login with correct credentials', async () => {
    const loginData = { email: 'testuser@example.com', password: 'password123' };  // Corrected to plaintext password
    const res = await request(app).post('/api/auth/login').send(loginData);
  
    console.log('Response status:', res.statusCode);
    console.log('Response body:', res.body);
  
    if (res.statusCode !== 200) {
      console.error('Login failed due to:', res.body.error);
    }
  
    expect(res.statusCode).toBe(200); // Expect successful login
    expect(res.body).toHaveProperty('token');
  });
  
  test('Should not login with incorrect password', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'testuser@example.com',
      password: 'wrongpassword',
    });
  
    console.log('Invalid password response:', res.body);
  
    expect(res.statusCode).toBe(401); // Expect unauthorized error
    expect(res.body).toHaveProperty('error', 'Invalid credentials');
  });
  
  test('Should return 404 for non-existent user login', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'nonexistent@example.com',
      password: 'password123',
    });
  
    console.log('Non-existent user login response:', res.body);
  
    expect(res.statusCode).toBe(404); // Expect not found error
    expect(res.body).toHaveProperty('error', 'User not found');
  });

  test('Should fetch user profile', async () => {
    const res = await request(app).get('/api/users/profile/1'); // Assuming ID 1 exists
    console.log('Profile fetch response:', res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user.username).toBe('testuser');
  });
});