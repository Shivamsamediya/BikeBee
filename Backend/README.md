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
  ### POST /captains/register
  
  #### Description
  This endpoint is used to register a new captain.
  
  #### Request Body
  The request body must be a JSON object containing the following fields:
    - `fullName`: An object containing:
      - `firstName` (string, required): The first name of the captain. Must be at least 3 characters long.
      - `lastName` (string, optional): The last name of the captain.
    - `email` (string, required): The email address of the captain. Must be a valid email format.
    - `password` (string, required): The password for the captain. Must be at least 6 characters long.
    - `vehicle`: An object containing:
      - `color` (string, required): The color of the vehicle. Must be at least 3 characters long.
      - `plate` (string, required): The plate number of the vehicle. Must be at least 3 characters long.
      - `capacity` (integer, required): The capacity of the vehicle. Must be at least 1.
      - `vehicleType` (string, required): The type of the vehicle. Must be one of 'car', 'motorcycle', or 'auto'.
  
  #### Example Request
  ```json
  {
    "fullName": {
      "firstName": "Jane",
      "lastName": "Doe"
    },
    "email": "jane.doe@example.com",
    "password": "password123",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ123",
      "capacity": 2,
      "vehicleType": "motorcycle"
    }
  }
  ```
  
  #### Responses
  
  ##### Success (201)
  - **Description**: Captain registered successfully.
  - **Content**: JSON object containing the generated token and captain details.
  - **Example**:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "captain": {
        "_id": "60d0fe4f5311236168a109ca",
        "fullName": {
          "firstName": "Jane",
          "lastName": "Doe"
        },
        "email": "jane.doe@example.com",
        "vehicle": {
          "color": "Red",
          "plate": "XYZ123",
          "capacity": 2,
          "vehicleType": "motorcycle"
        }
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
          "msg": "FirstName must be atleast 3 characters long",
          "param": "fullName.firstName",
          "location": "body"
        },
        {
          "msg": "Password must be atleast 6 characters long",
          "param": "password",
          "location": "body"
        },
        {
          "msg": "Color must be atleast 3 characters long",
          "param": "vehicle.color",
          "location": "body"
        },
        {
          "msg": "Plate must be atleast 3 characters long",
          "param": "vehicle.plate",
          "location": "body"
        },
        {
          "msg": "Capacity must be atleast 1",
          "param": "vehicle.capacity",
          "location": "body"
        },
        {
          "msg": " must be atleast 3 characters long",
          "param": "vehicle.vehicleType",
          "location": "body"
        }
      ]
    }
    ```
  
  ##### Error (400)
  - **Description**: Captain with this email already exists.
  - **Content**: JSON object containing the error message.
  - **Example**:
    ```json
    {
      "message": "Captain with this email already exists"
    }
    ```

### POST /captains/login

#### Description
This endpoint is used to log in an existing captain.

#### Request Body
The request body must be a JSON object containing the following fields:
- `email` (string, required): The email address of the captain. Must be a valid email format.
- `password` (string, required): The password for the captain. Must be at least 6 characters long.

#### Example Request
```json
{
  "email": "jane.doe@example.com",
  "password": "password123"
}
```

#### Responses

##### Success (200)
- **Description**: Captain logged in successfully.
- **Content**: JSON object containing the generated token and captain details.
- **Example**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
      "_id": "60d0fe4f5311236168a109ca",
      "fullName": {
        "firstName": "Jane",
        "lastName": "Doe"
      },
      "email": "jane.doe@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "XYZ123",
        "capacity": 2,
        "vehicleType": "motorcycle"
      }
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
        "msg": "Password must be atleast 6 characters long",
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
    "message": "Invalid email or password"
  }
  ```

### GET /captains/profile

#### Description
This endpoint is used to get the profile of the authenticated captain.

#### Headers
- `Authorization` (string, required): The JWT token of the authenticated captain.

#### Example Request
```
GET /captains/profile
Authorization: Bearer <token>
```

#### Responses

##### Success (201)
- **Description**: Captain profile retrieved successfully.
- **Content**: JSON object containing the captain details.
- **Example**:
  ```json
  {
    "_id": "60d0fe4f5311236168a109ca",
    "fullName": {
      "firstName": "Jane",
      "lastName": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ123",
      "capacity": 2,
      "vehicleType": "motorcycle"
    }
  }
  ```

##### Error (401)
- **Description**: Unauthorized captain.
- **Content**: JSON object containing the error message.
- **Example**:
  ```json
  {
    "message": "Unauthorized captain"
  }
  ```

### GET /captains/logout

#### Description
This endpoint is used to log out the authenticated captain and blacklist the token provided in cookie or headers.

#### Headers
- `Authorization` (string, required): The JWT token of the authenticated captain.

#### Example Request
```
GET /captains/logout
Authorization: Bearer <token>
```

#### Responses

##### Success (200)
- **Description**: Captain logged out successfully.
- **Content**: JSON object containing the success message.
- **Example**:
  ```json
  {
    "message": "Logged out"
  }
  ```

##### Error (401)
- **Description**: Unauthorized captain.
- **Content**: JSON object containing the error message.
- **Example**:
  ```json
  {
    "message": "Unauthorized captain"
  }
  ```