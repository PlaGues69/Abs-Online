import { useMutation } from "@tanstack/react-query";
import { loginUserService } from "../services/authService.js";  // Explicitly add .js for authService
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider.jsx";  // Explicitly add .jsx for AuthProvider

export const useLoginUser = () => {
    const { login } = useContext(AuthContext);

    return useMutation({
        mutationFn: loginUserService,
        mutationKey: ["login_key"], // mutation key unchanged
        onSuccess: (data) => {
            login(data?.data, data?.token);
            toast.success(data?.message || "Login Success");
        },
        onError: (err) => {
            toast.error(err?.message || "Login Failed");
        }
    });
};
