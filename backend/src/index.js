const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes')
const blogRoutes = require('./routes/blogRoutes')



const app = express();
app.use(express.json());

app.use(cors({
  origin: ['https://blog-app-iota-rose.vercel.app','http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true,
}));

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
