# Project-Ethos

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)

## Table of Contents

- [Project-Ethos](#project-ethos)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
  - [Folder Structure](#folder-structure)
  - [Usage](#usage)
  - [Future Enhancements](#future-enhancements)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)

## Overview

**Project-Ethos** is a platform designed to empower individuals by allowing them to share their experiences with companies anonymously. Whether you're choosing a job, buying your first car, or selecting health insurance, **Project-Ethos** helps you make informed decisions by providing genuine feedback from others.

Our mission is to create a transparent environment where both potential employees and customers can benefit from community-driven insights. By fostering accountability and ethical practices within organizations, **Project-Ethos** serves as a decision-making tool without causing division or retaliation.

Inspired by the democratic spirit of ancient Athens, Project-Ethos provides critical thinking tools and a supportive space for users to align with companies that resonate with their personal and professional values.

## Features

- **Anonymous Experience Sharing**
  - Users can post reviews about their experiences without revealing their identities.
  
- **Guest Access**
  - Quickly browse general information (e.g., aggregate ratings) without signing up.
  - Sign up to view detailed reviews or leave your own feedback.

- **Verified Accounts for Accountability**
  - Users must create accounts to ensure authenticity and prevent misuse.

- **Comprehensive Review Categories**
  - Share insights on product/service quality, workplace culture, leadership effectiveness, and more.

- **Balanced Feedback Forms**
  - Guided prompts encourage users to provide both positive and constructive feedback.

- **Empowerment Tools**
  - Highlight shared values and common themes across reviews to help users make informed decisions.

- **Community Collaboration**
  - Engage in respectful discussions and connect with like-minded individuals.

- **Tone Moderation**
  - AI-driven moderation ensures that reviews remain constructive and free from divisive language.

- **Recognition and Rewards**
  - Earn badges and incentives for providing thoughtful and balanced reviews.

## Tech Stack

- **Frontend:** React.js, Redux, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Authentication:** Firebase Authentication
- **Deployment:** Vercel (Frontend), Heroku (Backend)
- **Version Control:** GitHub

## Installation

Follow these steps to set up Project-Ethos locally:

### Prerequisites

- **Node.js** (v14 or later)
- **npm** or **yarn**
- **PostgreSQL** installed and running
- **Git** installed

### Clone the Repository

```bash
git clone https://github.com/your-username/project-ethos.git
cd project-ethos
```

### Backend Setup
1. Navigate to the Backend Directory
    ```bash
    cd backend
    ```

2.	Initialize a Node.js Project
    ```bash
    npm init -y
    ```
3.	Install Dependencies
    ```
    npm install express cors body-parser sequelize pg pg-hstore dotenv
    ```
4.	Configure Environment Variables
- Create a .env file in the backend directory:
    ```bash
    touch .env
    ```
-	Add the following variables to .env:
    ```js
    PORT=5000
    DATABASE_URL=postgres://username:password@localhost:5432/project_ethos
    JWT_SECRET=your_jwt_secret
    FIREBASE_API_KEY=your_firebase_api_key
    ```
    (Replace `username`, `password`, and `your_jwt_secret` with your actual PostgreSQL credentials and a secure JWT secret.)

5.	Set Up the Database
-	Create a PostgreSQL database named project_ethos:
    ```bash
    createdb project_ethos
    ```
 
6.	Create Basic Server File
-	Create a server.js file in the backend directory with the following content:
    ```js
    const express = require('express');
    const cors = require('cors');
    const bodyParser = require('body-parser');
    const dotenv = require('dotenv');
    const { Sequelize } = require('sequelize');
    dotenv.config();
    const app = express();
    const port = process.env.PORT || 5000;
    app.use(cors());
    app.use(bodyParser.json());
    // Initialize Sequelize
    const sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        logging: false,
    });
    // Test Database Connection
    sequelize.authenticate()
        .then(() => console.log('Database connected...'))
        .catch(err => console.log('Error: ' + err));
    app.get('/', (req, res) => {
        res.send('Project-Ethos Backend');
    });
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
    ```
7.	Start the Backend Server
    ```bash
    node server.js
    ```
    The backend server should now be running on http://localhost:5000.

### Frontend Setup
1.	Navigate to the Frontend Directory
    ```bash
    cd ../frontend
    ```
2.	Initialize a React App
    ```bash
    npx create-react-app .
    ```
3.	Install Additional Dependencies
    ```bash
    npm install react-router-dom axios redux react-redux tailwindcss
    ```
4.	Set Up Tailwind CSS
-	Initialize Tailwind CSS:
    ```bash
    npx tailwindcss init
    ```
-	Configure tailwind.config.js:
    ```js
    module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
    }
    ```
-	Add Tailwind directives to src/index.css:
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```
5.	Configure Environment Variables
-	Create a .env file in the frontend directory:
    ```bash
    touch .env
    ```
-	Add the following variables to .env:
    ```bash
    REACT_APP_API_URL=http://localhost:5000
    REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
    ```
    (Replace `your_firebase_api_key` with your actual Firebase API key.)

6.	Start the Frontend Development Server
    ```bash
    npm start
    ```
    The frontend application should now be running on http://localhost:3000.

## Folder Structure

The folder structure for Project-Ethos is designed to be scalable and maintainable, supporting both frontend and backend development. Below is an overview of the project structure:

```plaintext
project-ethos/
├── .github/                     # GitHub-specific files (CI workflows, issue templates, etc.)
│   └── workflows/
│       └── ci.yml               # Continuous integration workflow
├── backend/                     # Backend codebase
│   ├── src/                     # Source files for backend
│   │   ├── config/              # Configuration files (e.g., database, environment)
│   │   ├── controllers/         # Request handlers for routes
│   │   ├── models/              # Database models
│   │   ├── routes/              # API route definitions
│   │   ├── middlewares/         # Middleware for authentication, validation, etc.
│   │   ├── utils/               # Helper functions and utilities
│   │   └── app.js               # Main application setup
│   ├── tests/                   # Unit and integration tests for backend
│   ├── package.json             # Backend dependencies and scripts
│   ├── .eslintrc.js             # Backend ESLint configuration
│   ├── .prettierrc              # Prettier configuration
│   └── .env.example             # Example environment variables file
├── frontend/                    # Frontend codebase
│   ├── public/
│   │   ├── index.html               # Entry point for React
│   │   ├── favicon.ico              # App favicon
│   │   └── assets/                  # Static assets
│   │       ├── icons/               # Icons for the app
│   │       ├── logos/               # App logos
│   │       └── illustrations/       # Illustrations for empty states, onboarding, etc.
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/              # Generic components (buttons, inputs)
│   │   │   │   ├── Button.jsx       # Primary, secondary, etc.
│   │   │   │   ├── TextField.jsx    # Input fields
│   │   │   │   ├── Dropdown.jsx     # Dropdown menus
│   │   │   │   └── Modal.jsx        # Reusable modal component
│   │   │   ├── layout/              # Layout components
│   │   │   │   ├── Header.jsx       # Top navigation
│   │   │   │   ├── Footer.jsx       # Footer section
│   │   │   │   └── Sidebar.jsx      # Side navigation (if needed)
│   │   │   └── pages/               # Page-specific components
│   │   │       ├── LandingPage.jsx  # Landing page design
│   │   │       ├── Dashboard.jsx    # Dashboard with company list
│   │   │       ├── CompanyProfile.jsx # Company detail view
│   │   │       ├── WriteReview.jsx  # Write review form
│   │   │       └── Profile.jsx      # User profile/settings
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── services/                # API integration (e.g., Axios)
│   │   ├── context/                 # React Context for state management
│   │   ├── styles/                  # Global styles
│   │   │   ├── colors.css           # Color variables
│   │   │   ├── typography.css       # Font styles (Inter, Roboto)
│   │   │   └── components.css       # Button, input, and other component styles
│   │   ├── utils/                   # Utility functions
│   │   ├── App.jsx                  # Root application component
│   │   └── index.js                 # Entry point
│   ├── tests/                   # Unit and integration tests for frontend
│   ├── package.json             # Frontend dependencies and scripts
│   ├── .eslintrc.js             # Frontend ESLint configuration
│   ├── .prettierrc              # Prettier configuration
│   └── .env.example             # Example environment variables file
├── docs/                        # Documentation files
│   ├── API.md                   # API documentation
│   ├── CONTRIBUTING.md          # Contribution guidelines
│   ├── STYLE_GUIDE.md           # Coding style guide
│   └── README.md                # General project overview
├── screenshots/                 # Screenshots for documentation or promotional purposes
├── .gitignore                   # Ignore unnecessary files
├── CODE_OF_CONDUCT.md           # Code of conduct for contributors
├── LICENSE                      # License for the project
└── README.md                    # Main README file
```

## Usage
- Guests can browse general reviews and aggregate ratings for companies.
- Registered users can access detailed reviews, leave feedback, and engage with the community.
- The platform is accessible on mobile-first design, with scaling for larger resolutions.

Future Enhancements
- Recommendation System Integration:
- Explore integrating ByteDance’s Monolith, a lightweight recommendation system, to provide personalized content for users.
- Comparison Tool:
- Allow users to compare multiple companies side-by-side for workplace culture, product quality, and leadership scores.
- Advanced Moderation:
- Expand AI-driven moderation to handle complex tone analysis and ensure constructive discussions.
- Gamification Features:
- Introduce levels, badges, and rewards to encourage user participation.
- Localization:
- Support multiple languages and cultural preferences to expand the platform’s reach.

## Contributing

We welcome contributions from the community! Please see our Contributing Guidelines and Code of Conduct for more details.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For questions or feedback, please contact:
- Email: your-email@example.com
- GitHub Issues: Project-Ethos Issues

---

### **Instructions for Using This**

1. Replace `your-username` and `your-email@example.com` with your actual GitHub username and contact email.
2. Add screenshots and API documentation links when ready.
3. Update the "Future Enhancements" section as needed to include additional features on your roadmap.

This updated Markdown README is now ready to paste into your repository. Let me know if further customization is needed!