import React, { useContext } from 'react'
import RegisterForm from '../components/auth/RegisterForm'
import { AuthContext } from '../auth/AuthProvider'
import './Css/Register.css';
export default function Register() {
    const { user } = useContext(AuthContext)

    if (user) {
        return <div className="already-registered-message">You are already registered and logged in.</div>
    }

    return (
        <div className="register-page-container">
            <h2 className="register-page-title">Register</h2>
            <div className="register-form-wrapper">
                <RegisterForm />
            </div>
        </div>
    )
}
