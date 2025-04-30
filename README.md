# Department Manager API

A backend API for managing departments and sub-departments built with NestJS, GraphQL, TypeORM, and PostgreSQL.

## Features

- JWT Authentication
- GraphQL API
- CRUD operations for departments and sub-departments
- Input validation
- TypeScript implementation
- PostgreSQL database with TypeORM

## Prerequisites

- Node.js v16 or higher
- PostgreSQL
- Docker and Docker Compose (optional for containerized setup)

## Installation

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/Richd0tcom/graphql-nest-poc
   cd department-manager-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following configuration:
   ```
   NODE_ENV=development
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_DATABASE=department_manager
   JWT_SECRET=your_secret_key_here
   PORT=3000
   ```

4. Start a PostgreSQL instance:
   - You can use your local PostgreSQL installation or start a container using Docker:
     ```bash
     docker run --name postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=department_manager -p 5432:5432 -d postgres:16
     ```

5. Run the application:
   ```bash
   npm run start:dev
   ```

### Using Docker Compose

1. Clone the repository:
   ```bash
   git clone https://github.com/Richd0tcom/graphql-nest-poc
   cd department-manager-api
   ```

2. Start the application using Docker Compose:
   ```bash
   docker-compose up
   ```

## Database Seeding

To seed the database with initial data:

```bash
npm run seed
```

This will create:
- An admin user with username `admin` and password `admin123`
- Sample departments and sub-departments

## API Documentation

### Authentication

- **Login**: Authenticate a user and get a JWT token
  ```curl
 curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test@example.com",
    "password": "password123"
  }'
  ```

### Department Management

- **Create Department**: Create a new department with optional sub-departments
  ```graphql
  mutation {
    createDepartment(input: {
      name: "Finance",
      subDepartments: [
        { name: "Accounts" },
        { name: "Audit" }
      ]
    }) {
      id
      name
      subDepartments {
        id
        name
      }
    }
  }
  ```


- **Get Department**: Fetch a specific department by ID
  ```graphql
  query {
    getDepartment(id: 1) {
      id
      name
      subDepartments {
        id
        name
      }
    }
  }
  ```

- **Update Department**: Update a department's name
  ```graphql
  mutation {
    updateDepartment(input: {
      id: 1,
      name: "Finance Department"
    }) {
      id
      name
    }
  }
  ```

- **Delete Department**: Delete a department by ID
  ```graphql
  mutation {
    deleteDepartment(id: 1)
  }
  ```


## Deployment

This application is designed to be deployed on Render.com. 

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the following environment variables:
   - `NODE_ENV=production`
   - `DB_HOST=[your-postgres-host]`
   - `DB_PORT=5432`
   - `DB_USERNAME=[your-postgres-username]`
   - `DB_PASSWORD=[your-postgres-password]`
   - `DB_DATABASE=[your-postgres-database]`
   - `JWT_SECRET=[your-secret-key]`
4. Deploy the service

## License

This project is [MIT licensed](LICENSE).