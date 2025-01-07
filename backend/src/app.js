const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log('Error: ' + err));

sequelize.sync({ force: true })
  .then(() => console.log('Tables created successfully'))
  .catch((err) => console.log('Error syncing tables: ' + err));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/auth', require('./routes/authRoutes')); // Authentication routes
app.use('/api/companies', require('./routes/companyRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/test', require('./routes/testRoutes'));

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Project-Ethos API!');
});

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;