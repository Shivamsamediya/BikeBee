# BikeBee Backend API Documentation

## Endpoints

### POST /users/register

#### Description
This endpoint is used to register a new user.

#### Request Body
The request body must be a JSON object containing the following fields:
  - `fullName`: An object containing:
  - `firstName` (string, required): The first name of the user. Must be at least 3 characters long.
  - `lastName` (string, optional): The last name of the user. Must be at least 3 characters long if provided.
  - `email` (string, required): The email address of the user. Must be a valid email format.
  - `password` (string, required): The password for the user. Must be at least 6 characters long.

#### Example Request
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Responses

##### Success (201)
- **Description**: User registered successfully.
- **Content**: JSON object containing the generated token and user details.
- **Example**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "60d0fe4f5311236168a109ca",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

##### Error (400)
- **Description**: Validation error or missing required fields.
- **Content**: JSON object containing the error details.
- **Example**:
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "FirstName length must be greater than 3",
        "param": "fullName.firstName",
        "location": "body"
      },
      {
        "msg": "Password length must be greater than 6",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

### POST /users/login

#### Description
This endpoint is used to log in an existing user.

#### Request Body
The request body must be a JSON object containing the following fields:
- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user. Must be at least 6 characters long.

#### Example Request
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Responses

##### Success (200)
- **Description**: User logged in successfully.
- **Content**: JSON object containing the generated token and user details.
- **Example**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "60d0fe4f5311236168a109ca",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

##### Error (400)
- **Description**: Validation error or missing required fields.
- **Content**: JSON object containing the error details.
- **Example**:
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password length must be greater than 6",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

##### Error (401)
- **Description**: Invalid email or password.
- **Content**: JSON object containing the error message.
- **Example**:
  ```json
  {
    "message": "Invalid email or password!"
  }
  ```

### GET /users/profile

#### Description
This endpoint is used to get the profile of the authenticated user.

#### Headers
- `Authorization` (string, required): The JWT token of the authenticated user.

#### Example Request
```
GET /users/profile
Authorization: Bearer <token>
```

#### Responses

##### Success (201)
- **Description**: User profile retrieved successfully.
- **Content**: JSON object containing the user details.
- **Example**:
  ```json
  {
    "_id": "60d0fe4f5311236168a109ca",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
  ```

##### Error (401)
- **Description**: Unauthorized user.
- **Content**: JSON object containing the error message.
- **Example**:
  ```json
  {
    "message": "Unauthorized user"
  }
  ```

### GET /users/logout

#### Description
This endpoint is used to log out the authenticated user and blacklist the token provided in cookie or headers.

#### Headers
- `Authorization` (string, required): The JWT token of the authenticated user.


#### Example Request
```
GET /users/logout
Authorization: Bearer <token>
```

#### Responses

##### Success (200)
- **Description**: User logged out successfully.
- **Content**: JSON object containing the success message.
- **Example**:
  ```json
  {
    "message": "Logged out"
  }
  ```

##### Error (401)
- **Description**: Unauthorized user.
- **Content**: JSON object containing the error message.
- **Example**:
  ```json
  {
    "message": "Unauthorized user"
  }
  ```