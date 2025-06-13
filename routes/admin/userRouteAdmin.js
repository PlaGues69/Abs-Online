const express = require("express");
const userRoutes = express.Router();

const {
    createUser,
    getUsers,
    getOneUser,
    updateOne,
    deleteOne,
} = require("../../controllers/admin/usermanagement");

const {
    verifyAuth,
    checkAdminRole,
} = require("../../middlewares/authorizedUsers");

// Route to create a new user
userRoutes.post("/", createUser);

// Route to get all users (admin only)
userRoutes.get("/", verifyAuth, checkAdminRole, getUsers);

// Route to get a specific user by ID
userRoutes.get("/:id", getOneUser);

// Route to update a user by ID
userRoutes.put("/:id", updateOne);

// Route to delete a user by ID
userRoutes.delete("/:id", deleteOne);

module.exports = userRoutes;
