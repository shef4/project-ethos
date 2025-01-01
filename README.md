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
  - [Usage](#usage)
  - [Screenshots](#screenshots)
  - [API Documentation](#api-documentation)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)

## Overview

**Project-Ethos** is a platform designed to empower individuals by allowing them to share their experiences with companies anonymously. Our mission is to create a transparent environment where both potential employees and customers can make informed decisions based on genuine feedback. By fostering a community-driven approach, Project-Ethos promotes accountability and ethical practices within organizations without causing division or retaliation.

Inspired by the democratic spirit of ancient Athens, Project-Ethos provides critical thinking tools and a supportive space for users to align with companies that resonate with their personal and professional values.

## Features

- **Anonymous Experience Sharing**
  - Users can post reviews about their experiences with companies without revealing their identities.
  
- **Verified Accounts for Accountability**
  - While reviews are anonymous, users must create Vifidea accounts to ensure authenticity and prevent misuse.
  
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
