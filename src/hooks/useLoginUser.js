import { useMutation } from "@tanstack/react-query";
import { loginUserService } from "../services/authService.js";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider.jsx";

export const useLoginUser = () => {
  const { setUser } = useContext(AuthContext);

  return useMutation({
    mutationFn: loginUserService,
    onSuccess: (res) => {
      toast.success(res.message || "Login success");

      // store token and set user
      localStorage.setItem("token", res.token);
      setUser(res.data);  // make sure to save full user object including isAdmin
    },
    onError: (err) => {
      toast.error(err.message || "Login failed");
    }
  });
};
