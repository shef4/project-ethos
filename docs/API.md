# Project-Ethos API Documentation

Welcome to the **Project-Ethos** API documentation. This guide provides detailed information on the available endpoints, request parameters, response formats, authentication, and error handling.

## Table of Contents

- [Authentication](#authentication)
  - [Sign Up](#sign-up)
  - [Login](#login)
- [Companies](#companies)
  - [Get All Companies](#get-all-companies)
  - [Get Company Details](#get-company-details)
- [Reviews](#reviews)
  - [Submit a Review](#submit-a-review)
  - [Get Reviews for a Company](#get-reviews-for-a-company)
- [Users](#users)
  - [Get User Profile](#get-user-profile)
- [Error Handling](#error-handling)

## Authentication

### Sign Up

**Endpoint:** `/api/auth/signup`

**Method:** `POST`

**Description:** Registers a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "username": "user123"
}
```
**Response:**
- 201 Created
    ```json
    {
    "message": "User registered successfully.",
    "user": {
        "id": "user_id",
        "email": "user@example.com",
        "username": "user123",
        "createdAt": "2025-01-01T00:00:00.000Z"
    },
    "token": "jwt_token"
    }
    ```
- 400 Bad Request
    ```json
    {
    "error": "Email already in use."
    }
    ```

### Login

**Endpoint:** `/api/auth/login`

**Method:** `POST`

**Description:** Authenticates a user and returns a JWT token.

**Request Body:**
```JSON
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```
**Response:**
- 200 OK
    ```JSON
    {
    "message": "Login successful.",
    "user": {
        "id": "user_id",
        "email": "user@example.com",
        "username": "user123",
        "createdAt": "2025-01-01T00:00:00.000Z"
    },
    "token": "jwt_token"
    }
    ```
- 401 Unauthorized
    ```JSON
    {
    "error": "Invalid email or password."
    }
    ```

## Companies

### Get All Companies

**Endpoint:** `/api/companies`

**Method:** `GET`

**Description:** Retrieves a list of all companies with aggregated ratings.

**Query Parameters:**
- search (optional): Search companies by name or keywords.

**Response:**
- 200 OK
    ```JSON
    {
    "companies": [
        {
        "id": "company_id",
        "name": "Company A",
        "ratings": {
            "product": 4.5,
            "workplace": 4.0,
            "leadership": 3.8
        },
        "createdAt": "2025-01-01T00:00:00.000Z"
        },
        {
        "id": "company_id",
        "name": "Company B",
        "ratings": {
            "product": 3.9,
            "workplace": 4.2,
            "leadership": 4.1
        },
        "createdAt": "2025-01-02T00:00:00.000Z"
        }
    ]
    }
    ```

### Get Company Details

**Endpoint:** /api/companies/:id

**Method:** GET

**Description:** Retrieves detailed information and reviews for a specific company.

**Path Parameters:**
- id: The unique identifier of the company.

**Response:**
- 200 OK
    ```JSON
    {
    "id": "company_id",
    "name": "Company A",
    "description": "A brief description of Company A.",
    "ratings": {
        "product": 4.5,
        "workplace": 4.0,
        "leadership": 3.8
    },
    "reviews": [
        {
        "id": "review_id",
        "category": "workplace",
        "rating": 4,
        "comment": "Great place to work with a supportive team.",
        "createdAt": "2025-01-10T12:34:56.789Z",
        "userId": "user_id"
        },
        {
        "id": "review_id",
        "category": "product",
        "rating": 5,
        "comment": "Innovative products that exceed expectations.",
        "createdAt": "2025-01-12T08:22:33.456Z",
        "userId": "user_id"
        }
    ]
    }
    ```
- 404 Not Found
    ```JSON
    {
    "error": "Company not found."
    }
    ```

## Reviews

### Submit a Review

**Endpoint:** `/api/reviews`

**Method:** `POST`

**Description:** Submits a new review for a company.

**Headers:**
- Authorization: `Bearer jwt_token`

**Request Body:**
```JSON
{
"companyId": "company_id",
"category": "workplace",
"rating": 4,
"comment": "Great place to work with a supportive team."
}
```

**Response:**
- 201 Created
    ```JSON
    {
    "message": "Review submitted successfully.",
    "review": {
        "id": "review_id",
        "companyId": "company_id",
        "category": "workplace",
        "rating": 4,
        "comment": "Great place to work with a supportive team.",
        "createdAt": "2025-01-20T14:30:00.000Z",
        "userId": "user_id"
    }
    }
    ```
- 400 Bad Request
    ```JSON
    {
    "error": "Invalid rating value."
    }
    ```
- 401 Unauthorized
    ```JSON
    {
    "error": "Authentication token missing or invalid."
    }
    ```

### Get Reviews for a Company

**Endpoint:** `/api/reviews/:companyId`

**Method:** `GET`

**Description:** Retrieves all reviews for a specific company.

**Path Parameters:**
- companyId: The unique identifier of the company.

**Response:**
- 200 OK
    ```JSON
    {
    "companyId": "company_id",
    "reviews": [
        {
        "id": "review_id",
        "category": "workplace",
        "rating": 4,
        "comment": "Great place to work with a supportive team.",
        "createdAt": "2025-01-20T14:30:00.000Z",
        "userId": "user_id"
        },
        {
        "id": "review_id",
        "category": "product",
        "rating": 5,
        "comment": "Innovative products that exceed expectations.",
        "createdAt": "2025-01-22T09:15:00.000Z",
        "userId": "user_id"
        }
    ]
    }
    ```
- 404 Not Found
    ```JSON
    {
    "error": "Company not found."
    }
    ```

## Users

### Get User Profile

**Endpoint:** `/api/users/:id`

**Method:** `GET`

**Description:** Retrieves the profile of a specific user. (Admin Only)

**Headers:**
- Authorization: `Bearer jwt_token`

**Path Parameters:**
- id: The unique identifier of the user.

**Response:**
- 200 OK
```JSON
{
  "id": "user_id",
  "email": "user@example.com",
  "username": "user123",
  "createdAt": "2025-01-01T00:00:00.000Z",
  "reviews": [
    {
      "id": "review_id",
      "companyId": "company_id",
      "category": "workplace",
      "rating": 4,
      "comment": "Great place to work with a supportive team.",
      "createdAt": "2025-01-20T14:30:00.000Z"
    }
  ]
}
```
- 404 Not Found
```JSON
{
  "error": "User not found."
}
```
- 401 Unauthorized
```JSON
{
  "error": "Authentication token missing or invalid."
}
```

## Error Handling

**All error responses follow the same structure:**
```JSON
{
  "error": "Error message describing what went wrong."
}
```
**Common HTTP Status Codes**
- 200 OK: The request was successful.
- 201 Created: The resource was successfully created.
- 400 Bad Request: The request was invalid or cannot be served.
- 401 Unauthorized: Authentication failed or user does not have permissions.
- 403 Forbidden: User is authenticated but does not have necessary permissions.
- 404 Not Found: The requested resource could not be found.
- 500 Internal Server Error: An error occurred on the server.

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header as follows:
```
Authorization: Bearer your_jwt_token
```
Ensure that you replace `your_jwt_token` with the token received upon successful login.
