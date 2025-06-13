const jwtLib = require("jsonwebtoken");
const UserModel = require("../models/User");

exports.verifyAuth = async (req, res, next) => {
    try {
        const tokenHeader = req.headers.authorization;

        if (!tokenHeader) {
            return res.status(403).json({
                success: false,
                message: "Authorization token missing",
            });
        }

        const extractedToken = tokenHeader.split(" ")[1];

        const decodedPayload = jwtLib.verify(extractedToken, process.env.SECRET);

        const foundUser = await UserModel.findById(decodedPayload._id);

        if (!foundUser) {
            return res.status(401).json({
                success: false,
                message: "User does not exist",
            });
        }

        req.user = foundUser;
        return next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to authenticate user",
        });
    }
};

exports.checkAdminRole = (req, res, next) => {
    const userRole = req.user?.role;

    if (userRole === "admin") {
        return next();
    }

    return res.status(403).json({
        success: false,
        message: "Forbidden: Admins only",
    });
};
