# Task Management System

## Overview

This is a full-stack Task Management System where users can register/login and manage tasks efficiently.  
Each user’s tasks are stored securely in MongoDB. The system supports creating, updating, deleting tasks, and filtering/searching tasks along with a dashboard statistics view.

## Tech Stack

- Frontend: React.js (Vite), Tailwind CSS, Axios, Lucide-react icons
- Backend: Node.js, Express.js, JWT Authentication, bcryptjs
- Database: MongoDB (Mongoose ODM)

## Setup Instructions

### Backend

1. Clone repository
   ```bash
   git clone https://github.com/DevSood12/task-manager-full-stack.git
   cd task-manager-full-stack
2. Install dependencies
    ```bash
    cd backend
    npm install

3. Setup database
    Install MongoDB locally OR use MongoDB Atlas
    Create a .env file inside backend/ with:
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key

4. Run migrations
    Not required (MongoDB uses schemas via Mongoose)
5. Start server  
    ```bash
    npm run dev
    
    Backend will run at: http://localhost:5000


### Frontend

1. Navigate to frontend directory
    ```bash
    cd task-manager

2. Install dependencies
    ```bash
    npm install

3. Configure API endpoints
    Update API baseURL in frontend code:
    Local: Update API baseURL in frontend code:
    Deployed: baseURL: "https://task-manager-full-stack-dcau.onrender.com/api"

4. Start development server
    ```bash
    npm run dev

   Frontend will run at:  http://localhost:5173

## Features Implemented

-  User Authentication (JWT Login/Register)
- Task Management System (Full CRUD + Priority/Status/Due Date)


## Challenges and Solutions

- **Challenge 1: Connecting MongoDB Atlas**
  - At first, the backend was not connecting to MongoDB Atlas because of wrong URI/password settings.
  - **Solution:** I created a proper database user in Atlas, allowed my IP access, and updated the correct MongoDB URI in the `.env` file.

- **Challenge 2: CORS and Frontend-Backend Connection**
  - After deployment, the frontend could not call backend APIs due to CORS errors and wrong API URL.
  - **Solution:** I updated the backend CORS settings to allow Vercel domains and updated the frontend axios baseURL to the deployed Render backend link.






























<!-- # Task Management System

## Overview

This is a full-stack Task Management System where users can register/login and manage their tasks efficiently.
Each user has their own tasks stored securely in MongoDB. The app supports task creation, updating, deletion, and filtering based on status/priority/category along with a dashboard view.

## Tech Stack

- Frontend: React.js (Vite), Tailwind CSS, Axios, Lucide-react icons  
- Backend: Node.js, Express.js, JWT Authentication, bcryptjs  
- Database: MongoDB (Mongoose ODM)

## Setup Instructions

### Backend

1. Clone repository
   ```bash
   git clone https://github.com/DevSood12/task-manager-full-stack.git
   cd task-manager-full-stack
2. Install dependencies
    ```bash
    cd backend
    npm install
    npm run dev
3. Setup database
    Install MongoDB locally OR use MongoDB Atlas
    Create a .env file inside backend/
4. Run migrations
    Not required (MongoDB uses schemas via Mongoose)
5. Start server
    Backend runs at http://localhost:5000

### Frontend

1. Navigate to frontend directory
    ```bash
    cd task-manager
    npm install
    npm run dev
2. Install dependencies
    npm install
3. Configure API endpoints
    baseURL: "http://localhost:5000/api"
4. Start development server
    npm run dev
    Frontend will run on http://localhost:5173
    


## Live Links

- Frontend (Vercel): https://task-manager-full-stack-vert.vercel.app/
- Backend (Render API): https://task-manager-full-stack-dcau.onrender.com

    
## Features Implemented

- User Registration & Login (JWT Authentication)
- Task Management (CRUD: Create, Read, Update, Delete)





     -->
