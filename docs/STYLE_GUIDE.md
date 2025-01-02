# Style Guide TODO

Welcome to the **Project-Ethos** Style Guide! This document outlines the coding standards and best practices to maintain a consistent and readable codebase. Adhering to these guidelines ensures that our project remains maintainable and scalable as we grow.

## Table of Contents

- [General Principles](#general-principles)
- [Code Formatting](#code-formatting)
  - [Indentation](#indentation)
  - [Line Length](#line-length)
  - [Trailing Spaces](#trailing-spaces)
- [Naming Conventions](#naming-conventions)
  - [Variables and Functions](#variables-and-functions)
  - [Classes and Components](#classes-and-components)
  - [Files and Directories](#files-and-directories)
- [JavaScript/TypeScript Guidelines](#javascripttypescript-guidelines)
  - [ESLint](#eslint)
  - [Prettier](#prettier)
- [React Guidelines](#react-guidelines)
  - [Component Structure](#component-structure)
  - [State Management](#state-management)
- [Git Commit Messages](#git-commit-messages)
- [Testing](#testing)
- [Security Considerations](#security-considerations)

## General Principles

- **Readability:** Code should be easy to read and understand.
- **Consistency:** Follow the same style across the entire codebase.
- **Simplicity:** Avoid unnecessary complexity; keep code as simple as possible.
- **Documentation:** Comment and document code where necessary to explain complex logic.

## Code Formatting

### Indentation

- Use **2 spaces** for indentation.
- Avoid using tabs.

```javascript
// Correct
function example() {
  const message = "Hello, World!";
  console.log(message);
}

// Incorrect
function example() {
	const message = "Hello, World!";
	console.log(message);
}

Line Length
	•	Limit lines to 80 characters where possible.
	•	For longer lines, consider breaking them up for better readability.

// Correct
const userDetails = getUserDetails(userId, includePreferences, includeHistory);

// Incorrect
const userDetails = getUserDetails(userId, includePreferences, includeHistory, includeNotifications);

Trailing Spaces
	•	Remove trailing spaces at the end of lines.

Naming Conventions

Variables and Functions
	•	Use camelCase for variables and functions.
	•	Function names should be descriptive and indicate their purpose.

// Correct
const userName = "Alice";
function fetchUserData() {}

// Incorrect
const User_Name = "Alice";
function FetchUserData() {}

Classes and Components
	•	Use PascalCase for class names and React components.

// Correct
class UserService {}
function UserProfile() {}

// Incorrect
class userService {}
function user_profile() {}

Files and Directories
	•	Use kebab-case for file and directory names.
	•	Match React component filenames with their component names.

# Correct
src/
  components/
    user-profile.jsx
    navbar.jsx

# Incorrect
src/
  components/
    UserProfile.jsx
    Navbar.jsx

JavaScript/TypeScript Guidelines

ESLint
	•	Configuration: Follow the rules defined in .eslintrc.js.
	•	Run Linting: npm run lint
	•	Auto-fix Issues: npm run lint:fix

Prettier
	•	Configuration: Defined in .prettierrc with the following settings:
	•	singleQuote: true
	•	trailingComma: "es5"
	•	printWidth: 80
	•	tabWidth: 2
	•	semi: true
	•	Formatting Commands:
	•	Check Formatting: npm run format -- --check
	•	Apply Formatting: npm run format -- --write

React Guidelines

Component Structure
	•	Prefer functional components over class-based components.
	•	Use React Hooks for state and lifecycle management.

// Correct
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(data => setUser(data));
  }, [userId]);

  return <div>{user ? user.name : 'Loading...'}</div>;
}

// Incorrect
import React, { Component } from 'react';

class UserProfile extends Component {
  state = { user: null };

  componentDidMount() {
    fetchUser(this.props.userId).then(user => this.setState({ user }));
  }

  render() {
    const { user } = this.state;
    return <div>{user ? user.name : 'Loading...'}</div>;
  }
}

State Management
	•	Use Redux for global state management.
	•	Structure state logically and keep it normalized.

Git Commit Messages
	•	Write clear and descriptive commit messages.
	•	Use the Imperative Mood in the subject line.
	•	Separate the subject from the body with a blank line.

# Correct
Add user authentication feature

Implement JWT-based authentication for secure login and signup.

# Incorrect
Added user authentication.

Testing
	•	Write unit tests for all critical functions and components.
	•	Use Jest and React Testing Library for testing.
	•	Ensure tests cover both typical and edge cases.

# Run tests
npm test

Security Considerations
	•	Validate and sanitize all user inputs to prevent security vulnerabilities like SQL injection and XSS attacks.
	•	Store sensitive information, such as passwords and API keys, securely using environment variables.
	•	Regularly update dependencies to patch known vulnerabilities.


