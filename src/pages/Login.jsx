import React, { useContext, useCallback } from 'react';
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

    if (user) {
        return (
            <div className="login-page">
                <div className="login-box">
                    <p>You are already logged in.</p>
                    <button 
                        className="login-button" 
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        );
    }

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