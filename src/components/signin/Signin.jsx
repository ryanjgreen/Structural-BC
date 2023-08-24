import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../AuthContext';
import { Link } from 'react-router-dom'; // Import Link
import './signin.css';

import logo from '../../assets/logo.svg';
import { FaCheckCircle } from 'react-icons/fa';

export default function SignIn() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login, isAuthenticated } = useAuth();
    const [setLoginSuccess] = useState(false);

    const onSubmit = async (data) => {
        try {
            await login(data.email, data.password);
            setLoginSuccess(true);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="main-signin">
            <div className="signin-container">
                {!isAuthenticated ? (
                    <div>
                        <div className="logo-struct">
                    <img src={logo} alt="Logo" />
                            </div>
                        <h1>Sign In</h1>
                        <span>Please sign in to use our services</span>
                        <form className='signin-form' onSubmit={handleSubmit(onSubmit)}>
                            <input
                                type="email"
                                className="email2"
                                {...register("email", { required: true })}
                                placeholder='email address'
                            />
                            {errors.email?.type === "required" && ""}
                        
                            <input
                                type="password"
                                className="password"
                                {...register("password", { required: true })}
                                placeholder='password'
                            />
                            {errors.password?.type === "required" && ""}

                            <div className="create-account-link">
                                 <p>No account? <Link to="/signup" className="create-account-link-text">Create one!</Link></p>
                            </div>



                        
                            <button className='signin-btn' type="submit">Sign In</button>
                        </form>
                    </div>
                ) : (
                    <div className="success-message">
                         <h2>Login successful!</h2>
                         <div className="success-checkmark">
                            <FaCheckCircle className="checkmark-icon" /> {/* Use the icon component */}
                        </div>
                             <Link to="/calculators">
                                 <button type='button'>Get Started</button>
                             </Link>
                    </div>
                )}
            </div>
        </div>
    );
}