const mongoose = require("mongoose");

const connectToDatabase = async () => {
    try {
        const dbUri = "mongodb://localhost:27017/Abs_backend";

        await mongoose.connect(dbUri); // No need for options anymore
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
};

module.exports = connectToDatabase;
