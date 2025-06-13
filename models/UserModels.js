const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: [true, "User ID is mandatory"],
            unique: true,
        },
        firstName: {
            type: String,
            required: [true, "First name is required"],
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password cannot be empty"],
        },
    },
    {
        timestamps: true,
        collection: "users",
    }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
