const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes')
const blogRoutes = require('./routes/blogRoutes')

const corsOptions = {
  origin: ['http://localhost:5173', 'https://your-frontend-domain.com'], // add all origins you want to allow
  credentials: true, // if you use cookies or auth headers
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 4000


mongoose.connect(process.env.MONGO_URL)
.then(() => console.log(`Connected to mongo db`))
.catch(() => console.log(`Error occurred while connecting to mongo db`)) 


//routes
app.use('/api/auth',authRoutes);
app.use('/api/blog',blogRoutes)

console.log("checking git")

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
