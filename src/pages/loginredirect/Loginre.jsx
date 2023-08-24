import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './loginre.css'; // Import your CSS file for styling
import logo from '../../assets/logo.svg';

export default function Loginre() {
    return (
        <div className="loginre">
            <div className="content">

                <div className="logo-struct2">
                    <img src={logo} alt="Logo" />
                </div>

                <h1>Welcome!</h1>
                <p>To access our services such as our Specified Lateral Earthquake Force calculator please <Link to = "/signin">sign in</Link> or <Link to="/signup">create an account</Link>.</p>
            </div>
        </div>
    );
}
