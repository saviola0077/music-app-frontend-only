import React, { useState } from "react";
import axios from "axios";
import './AdminLogin.css'; // Import the stylesheet
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const navigate = useNavigate();

    // State to store form inputs
    const [formData, setFormData] = useState({
        user_password: "",
        email: "",
    });

    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        
        console.log("Form Data:", formData);  // Log form data to check its contents
        console.log("Email:", formData.email); // Log email to verify its value

        if(formData.email == "admin"){
            if(formData.user_password == "password"){
                navigate('/admin/admin-dashboard');
            } else {
                setError("The password is invalid");
                setMessage(null); // Clear any previous success messages
            }
        } else {
            setError("The username is invalid");
            setMessage(null); // Clear any previous success messages
        }
    };

    // Navigate to the admin page
    const userPage = () => {
        navigate("/"); // Taking us to admin page
    }

    return (
        <div className="form-container">
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit} className="user-form">
                <div className="form-group">
                    <label htmlFor="email">Username:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter Username"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="user_password">Password:</label>
                    <input
                        type="password"
                        id="user_password"
                        name="user_password"
                        value={formData.user_password}
                        onChange={handleChange}
                        placeholder="Enter Password"
                        required
                    />
                </div>
                
                <button type="submit" className="submit-button">Submit</button> {"  "}
                
            </form>

            <div onClick={userPage} className="create-user-button">User Page</div>

            {/* Show success or error messages */}
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default AdminLogin;
