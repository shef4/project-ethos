const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const companyRoutes = require('./routes/companyRoutes');
const Company = require('./models/Company');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/companies', companyRoutes);

// Test Database Connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log('Error: ' + err));

// Sync Database
sequelize.sync({ force: true })
  .then(() => console.log('Database synced'))
  .catch((err) => console.log('Error syncing database: ' + err));

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));