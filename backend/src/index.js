const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 4000


//routes
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log(`Connected to mongo db`))
.catch(() => console.log(`Error occurred while connecting to mongo db`)) 


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
