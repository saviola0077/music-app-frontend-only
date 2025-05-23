import React, { useState } from "react";
import axios from "axios";
import './UserForm.css'; // Import the stylesheet
import { useNavigate } from 'react-router';

const LoginUser = () => {
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

    const validateForm = () => {
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError("Invalid email address.");
            return false;
        }
        return true;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Validate form data
        if (!validateForm()) {
            console.log("Validation fails");
            return;
        }

        console.log("Form Data:", formData);  // Log form data to check its contents
        console.log("Email:", formData.email); // Log email to verify its value

        try {
            // Fixed the protocol by adding http://
            const requestObj = {
                method: "post",
                url: 'http://localhost:4000/api/getUserEmail',
                data: {
                    email: formData.email
                }
            };
            const response = await axios(requestObj);

            setMessage(`Email: ${response.data.email}, Password: ${response.data.user_password}`); // Show success message

            // Checking if the password is correct
            if (response.data.user_password === formData.user_password) {
                // Navigate to another page after form submission
                navigate('/Home');
                setError(null); // Clear any previous errors
            } else {
                setError('The password is invalid');
                setMessage(null); // 
            }
            
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Unknown error occurred';
            setError(`Login Error: ${errorMessage}. Email doesn't exist`);
            setMessage(null); // Clear any previous success messages
            console.log(err.response);
        }
    };

    // Navigate to the create user page
    const createUser = () => {
        navigate("/register"); // Corrected the function call to navigate correctly
    }

    // Navigate to the admin page
    const admin = () => {
        navigate("/admin/admin-login"); // Taking us to admin page
    }

    return (
        <div className="form-container">
            <h2>User Login</h2>
            <form onSubmit={handleSubmit} className="user-form">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
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
                        placeholder="Enter password"
                        required
                    />
                </div>
                
                <button type="submit" className="submit-button">Submit</button> {"  "}
                
                {/* Change onChange to onClick and use navigate correctly */}
                <div onClick={createUser} className="create-user-button">Create New User</div>
            </form>

            <div onClick={admin} className="create-user-button">Admin Page</div>

            {/* Show success or error messages */}
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default LoginUser;
