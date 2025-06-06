# HCMUT Study Space Reservation System

This is a web application for managing study space reservations at HCMUT. The system allows students to reserve study spaces, view available spaces, and manage their reservations.

## Tools 
- Frontend: React, Vite
- Backend: FastAPI
- Database: MongoDB
- Authentication: JWT
- Docker

You must have the following tools installed on your machine:
- Python 3.8 or higher
- Node.js 14 or higher
- MongoDB
- Git
- pip (Python package manager)
- npm (Node package manager)

## How to run the project

1. Clone the repository:
   ```bash

    git clone https://github.com/HSon-2004/HCMUT_Study_Space_Reservation_System.git
   ```

2. Navigate to the project directory:
   ```bash
    cd hcmut-study-space-reservation
    ```

3. Navigate to the backend directory:
   ```bash
    cd backend
    ```
4. And then run the following command to install the dependencies:
   ```bash
    pip install -r requirements.txt
    ```
5. Create a `.env` file in the `backend` directory and add the following environment variables:
    ```bash
     SECRET_KEY=your_secret_key
     DATABASE_URL=your_database_url
     MONGO_URI=your_mongo_url
     ```
    Replace `your_secret_key` and `your_database_url` with your actual secret key and database URL.

6. Run backend server:
   ```bash
    python main.py
    ```

7. Navigate to the frontend directory:
    Open new terminal and run the following command:
    ```bash
     cd frontend
     ```

8. Install the dependencies:
    ```bash
     npm install
     ```
9. Create file `.env`
   ```bash
   VITE_BACKEND_URL=http://localhost:5000
   VITE_FRONTEND_URL=http://localhost:3000
   ```

9. Run the frontend server:
    ```bash
     npm run dev
     ```
10. Open your browser and go to `http://localhost:3000/` to access the application.

## Run project with docker
   ```bash
   docker compose up -d
   ```
Open your browser and go to `http://localhost:3000/` to access the application

## Note 
- Make sure MongoDB is running before starting the backend server.
- The backend server runs on port 5000 by default. If you want to change the port, you can do so in the `main.py` file.
- The frontend server runs on port 3000 by default. If you want to change the port, you can do so in the `vite.config.js` file.

## Accounts for testing
- Admin account:
  - Username: admin@example.com
  - Password: admin
- Student account:
    - Username: student@example.com
    - Password: student
- Teacher account:
    - Username: teacher@example.com
    - Password: teacher

`Note:` Database will be dropped after restart.
