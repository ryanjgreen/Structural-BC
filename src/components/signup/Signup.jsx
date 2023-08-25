import React, { useState } from 'react';
import Img from '../../assets/img.jpg';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import "./signup.css";
import { FaCheckCircle } from 'react-icons/fa';

export default function Form() {
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const [signUpSuccess, setSignUpSuccess] = useState(false);
    const [emailConflict, setEmailConflict] = useState(false); // State for email conflict
    
    const onSubmit = async (formData) => {
        try {
            if (formData.password !== formData.confirmpwd) {
                setEmailConflict(false); // Reset email conflict
                setError("confirmpwd", { type: "validate", message: "Passwords do not match" });
                return;
            }
    
            const { firstName, lastName, email, password } = formData; // Destructure the fields
            const response = await axios.post('https://structuralbc-cea735a41380.herokuapp.com/register', {
                firstName,
                lastName,
                email,
                password
            });
    
            if (response.status === 201) {
                setSignUpSuccess(true);
            }
            console.log(response.data);
        } catch (error) {
            console.error('Registration error:', error);
    
            if (error.response && error.response.status === 409) {
                setEmailConflict(true); // Update email conflict state
            }
        }
    };
    

    return (
        <div className="signup-container section__padding"> 
            <section>
                <div className="register">
                    <div className="col-1">
                        {!signUpSuccess && (
                            <div>
                                <h2>Sign Up</h2>
                                <span>Register and enjoy the service</span>
                            </div>
                        )}

                        {signUpSuccess ? (
                           <div className="success-message">
                           <h2>Registered successfully!</h2>
                           <div className="success-checkmark">
                             <FaCheckCircle className="checkmark-icon" /> {/* Use the spinning icon */}
                           </div>
                           <p>Your registration was successful. Welcome aboard!</p>
                         </div>
                         
                        ) : (
                            <form id='form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                                <input type="text" {...register("firstName", { required: true })} placeholder='first name' />
                                {errors.firstName?.type === "required" }
                                <input type="text" {...register("lastName", { required: true })} placeholder='last name' />
                                {errors.lastName?.type === "required" }
                                <input type="email" {...register("email", { required: true })} placeholder='email address' />
                                {errors.email?.type === "required" }
                                {emailConflict && <p className="email-conflict">Email already in use</p>}
                                <input type="password" {...register("password")} placeholder='password' />
                                <input type="password" {...register("confirmpwd")} placeholder='confirm password' />
                                <div className="error-container">
                                <p className={`password-mismatch ${errors.confirmpwd?.type === "validate" ? "visible" : ""}`}>
                                    Passwords do not match.
                                </p>
                                </div>
                                <button className='bt' type="submit">Sign Up</button>

                            </form>
                        )}
                    </div>
                    <div className="col-2">
                        <img src={Img} alt="" />
                    </div>
                </div>
            </section>
        </div>
    );
}
