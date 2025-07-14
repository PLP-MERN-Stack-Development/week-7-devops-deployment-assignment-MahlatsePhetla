
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/notes');

dotenv.config();

connectDB();

const app = express();


app.use(express.json());



app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://week-7-devops-deployment-assignment-eight.vercel.app'
  ],
  credentials: true
}));


app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

app.get('/', (req, res) => res.send('API is running...'));





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
