# CRUD Application with Next.js and Nest.js

This is a CRUD (Create, Read, Update, Delete) application built using Next.js and Nest.js. It provides a user management system with a user model.

## Features

### Frontend

- **Next.js with React:** The frontend is built using Next.js, a popular React framework.
- **Ant Design (ANTD):** Utilizes the ANTD library for a consistent and polished UI design.
- **React Query:** Implements React Query for efficient data fetching and state management.
- **Tailwind CSS:** Uses Tailwind CSS for utility-first styling, enabling rapid UI development.

### Backend

- **Nest.js:** The backend is developed using Nest.js, a progressive Node.js framework.
- **Prisma and Postgres:** Utilizes Prisma as the ORM (Object-Relational Mapping) tool and Postgres as the database.
- **CRUD Operations:** Implements Create, Read, Update, and Delete operations for the User model.

## Getting Started

To run the project locally, follow these steps:

1. **Install PostgreSQL:**
   Make sure you have PostgreSQL installed on your system.

2. **Set Up Environment:**
   Copy the contents of `.env.example` into a new `.env` file and replace the placeholder values with your configuration.

3. **Run the Backend:**
   Navigate to the server folder and execute the following commands:
   ```sh
   cd server
   npm install
   npx prisma generate
   npm run start:dev
  
***The server will run on port 5000.***

4. **Run the Frontend:**
  Navigate to the frontend folder and execute the following commands:
  ```sh
   cd frontend
   npm install
   npm run dev
  ```
***The app will run on port 3000.***