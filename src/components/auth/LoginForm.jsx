import React from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"
import { useLoginUser } from '../../hooks/useLoginUser'

export default function LoginForm() {
    const { mutate, data, error, isPending } = useLoginUser()

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Please fill email"),
        password: Yup.string().min(8, "Password needs 8 characters").required("Please fill password")
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema,
        onSubmit: (values) => {
            mutate(values)
        }
    })

    return (
        <div className="login-form-container">
            <h3 className="login-form-title">LoginForm</h3>
            <form onSubmit={formik.handleSubmit} className="login-form">
                <label className="login-label">Email</label>
                <input
                    type='email'
                    name='email'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="login-input"
                />
                {formik.touched.email && formik.errors.email && (
                    <p className="error-message">{formik.errors.email}</p>
                )}

                <label className="login-label">Password</label>
                <input
                    type='password'
                    name='password'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className="login-input"
                />
                {formik.touched.password && formik.errors.password && (
                    <p className="error-message">{formik.errors.password}</p>
                )}

                <button type='submit' className="login-button" disabled={isPending}>
                    {isPending ? "Logging in..." : "Login"}
                </button>

                {error && <p className="error-message">{error.message}</p>}
                {data && <p className="success-message">{data.message}</p>}
            </form>
        </div>
    )
}
