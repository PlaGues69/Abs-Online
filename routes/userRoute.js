const express = require("express");
const authRoutes = express.Router();

const {
    signUp,
    signIn,
} = require("../controllers/userController");

authRoutes.post("/register", signUp);
authRoutes.post("/login", signIn);

module.exports = authRoutes;
