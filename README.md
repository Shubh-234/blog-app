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

## Getting Started

### Prerequisites

- Make sure you have **Node.js** and **npm** installed on your machine.

---

## Environment Variables Setup

### Backend

Create a `.env` file inside the `backend` folder (alongside `package.json`) with your environment variables, for example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
