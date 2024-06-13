const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Allow requests from all origins
//app.use(cors());

// OR allow requests from a specific origin (replace 'http://localhost:3000' with your frontend URL)
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // include credentials in CORS requests (cookies, authorization headers)
}));

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
