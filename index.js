
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoute');
const postRoutes = require('./routes/postRoute');

const app = express();
const PORT = process.env.PORT || 5050;

connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);

app.get('/hey', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running on port number ${PORT}`);
});
