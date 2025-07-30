import React, { useContext, useCallback, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { AuthContext } from '../auth/AuthProvider';
import './Css/Login.css';

export default function Login() {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    }, [setUser, navigate]);

    // ✅ Redirect if user is already logged in
    useEffect(() => {
        if (user?.isAdmin) {
            navigate("/admin");
        } else if (user?._id) {
            navigate("/login");
        }
    }, [user, navigate]);

    return (
        <div className="login-page">
            <div className="login-box">
                <h2 className="login-title">Login</h2>

                <div className="login-links">
                    <NavLink to="/" className="nav-link">Go back</NavLink>
                    <Link to="/register" className="nav-link">Sign Up</Link>
                </div>

                <div className="login-form-wrapper">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}
