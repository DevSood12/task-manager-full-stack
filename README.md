# Task Management System

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
    cd backend
    npm install
3. Setup database
    Install MongoDB locally OR use MongoDB Atlas
    Create a .env file inside backend/
4. Run migrations
    Not required (MongoDB uses schemas via Mongoose)
5. Start server
    npm run dev
    Backend runs at http://localhost:5000

### Frontend

1. Navigate to frontend directory
    cd ../task-manager
2. Install dependencies
    npm install
3. Configure API endpoints
    baseURL: "http://localhost:5000/api"
4. Start development server
    npm run dev
    Frontend will run on http://localhost:5173
    
## Features Implemented

- User Registration & Login (JWT Authentication)
- Task Management (CRUD: Create, Read, Update, Delete)





    
