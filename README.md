# BLOG-APP

This is a MERN stack application with separate backend and frontend folders.

---

## Folder Structure

BLOG-APP  
│  
├── backend  
│ ├── src  
│ │ └── index.js  # Backend server entry point  
│ └── package.json  
│  
├── frontend  
│ └── package.json  
│  
└── .gitignore

---


---

## Getting Started

### Prerequisites

- Make sure you have **Node.js** and **npm** installed on your machine.  
  You can download Node.js (which includes npm) from [nodejs.org](https://nodejs.org/).

---

## Environment Variables Setup

### Backend

Create a `.env` file inside the `backend` folder (alongside `package.json`) with your environment variables, for example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Frontend
Create a .env file inside the frontend folder with variables prefixed by REACT_APP_, for example:

env
Copy
REACT_APP_API_URL=http://localhost:5000/api
Your frontend code can access these using process.env.REACT_APP_API_URL.

How to Run the Application
1. Backend Setup and Run
Open your terminal and navigate to the backend folder:

bash
Copy
cd backend
npm install
npm run dev
This will install backend dependencies and start the backend server (usually on port 5000).

2. Frontend Setup and Run
Open a new terminal window/tab and navigate to the frontend folder:

bash
Copy
cd frontend
npm install
npm run dev
This will install frontend dependencies and start the React development server (usually on port 3000).

Notes
Make sure your MongoDB instance is running and the connection string in MONGO_URI is correct.

The frontend expects the backend API to be available at the URL specified in REACT_APP_API_URL.

You can change the ports in .env files if needed to avoid conflicts.



