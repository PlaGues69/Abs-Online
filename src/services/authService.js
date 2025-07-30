import { loginUserApi, registerUserApi } from "../api/authApi.js";  // Add .js extension

export const registerUserService = async (formData) => {
    try {
        const response = await registerUserApi(formData);
        return response.data;
    } catch (err) {
        throw err.response?.data || { message: "Registration Failed" };
    }
};

export const loginUserService = async (formData) => {
    try {
        const response = await loginUserApi(formData);
        // Ensure that response includes full user object with isAdmin
        return {
            success: response.data.success,
            message: response.data.message,
            token: response.data.token,
            data: response.data.data,  // ✅ includes user info with isAdmin
        };
    } catch (err) {
        throw err.response?.data || { message: "Login Failed" };
    }
};
