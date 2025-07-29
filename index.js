require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoute');
const productRoutes = require('./routes/productRoute');
const adminUserRoutes = require('./routes/admin/userRouteAdmin');
const adminProductRoutes = require('./routes/admin/productRouteAdmin');
const orderRoutes = require('./routes/orderRoute');
const downloadRoutes = require('./routes/downloadRoute');

const app = express();
const PORT = process.env.PORT || 5050;

// ✅ Ensure 'uploads/' folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("📁 'uploads/' folder created.");
}

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", userRoutes);                    
app.use("/api/products", productRoutes);             
app.use("/api/admin/products", adminProductRoutes);   
app.use("/api/admin/users", adminUserRoutes);    
app.use("/api/orders", orderRoutes);                 
app.use("/api/download", downloadRoutes);

// Health check
app.get('/hey', (req, res) => {
  res.send('Hello World!');
});

// ✅ Only start the server if not in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port number ${PORT}`);
  });
}

// ✅ Export app for testing
module.exports = app;
