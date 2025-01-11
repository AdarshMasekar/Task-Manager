# 🚀 Task Manager Server 🚀

Welcome to the Task Manager Server! This project is a RESTful API built with Node.js and Express, designed to manage tasks efficiently. It allows users to create, read, update, and delete tasks, while also providing user authentication and validation.

## 📑 Table of Contents

- [Features](#features)
- [🛠️ Technologies Used](#technologies-used)
- [⚙️ Installation](#installation)
- [🚀 Usage](#usage)
- [📍 API Endpoints](#api-endpoints)
- [🧪 Testing](#testing)
- [🤝 Contributing](#contributing)
- [📜 License](#license)

## ✨ Features

- User authentication (signup and signin)
- Task management (CRUD operations)
- Input validation using Zod
- Error handling middleware
- Unit testing with Jest

## 🛠️ Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js, used to build the API.
- **MongoDB**: NoSQL database for storing user and task data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **Zod**: Schema validation library for input validation.
- **Jest**: Testing framework for running unit tests.
- **Supertest**: Library for testing HTTP servers.

## ⚙️ Installation

To get started with the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/task-manager-server.git
   ```

2. Navigate to the project directory:
   ```bash
   cd task-manager-server
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables:
   ```
   PORT=your_port
   MONGO_URI=your_mongo_uri
   SALT_ROUNDS=10
   JWT_SECRET=your_jwt_secret
   ```

## 🚀 Usage

To start the server, run the following command:

```bash
npm start
```

The server will be running on the specified port (default is 3000).

## 📍 API Endpoints

### User Routes

- **POST /api/user/signup**: Register a new user.
- **POST /api/user/signin**: Authenticate a user and return a JWT.
- **GET /api/user**: Retrieve all users.

### Task Routes

- **GET /api/tasks**: Get all tasks for the authenticated user.
- **GET /api/tasks/:taskId**: Get a specific task by ID.
- **POST /api/tasks**: Create a new task.
- **PATCH /api/tasks/:taskId**: Update an existing task.
- **DELETE /api/tasks/:taskId**: Delete a task.

## 🧪 Testing

To run the tests, use the following command:

```bash
npm test
```

This will execute all the tests defined in the `__test__` directory.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please fork the repository and submit a pull request.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for checking out the Task Manager Server! If you have any questions or feedback, feel free to reach out.

### 🧩 Explanation of Components

1. **Project Structure**: The project is organized into several directories:
   - `src`: Contains the main application code.
   - `model`: Defines the data models (User and Task).
   - `routes`: Contains the route definitions for user and task management.
   - `controller`: Contains the business logic for handling requests.
   - `middleware`: Contains middleware for authentication and validation.
   - `utils`: Contains utility functions, such as validation schemas.
   - `__test__`: Contains unit tests for the application.

2. **Middleware**: The project uses middleware for:
   - **Authentication**: Validates JWT tokens to secure routes.
   - **Validation**: Ensures that incoming requests meet the required schema.

3.  **Error Handling**: A centralized error handling middleware captures and responds to errors in a consistent format.

4.  **Testing**: The project includes unit tests to ensure the functionality of the API endpoints.

This README provides a comprehensive overview of the project, making it easy for new developers to understand and contribute.
