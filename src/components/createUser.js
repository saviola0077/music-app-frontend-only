import React, { useState } from "react";
import axios from "axios";
import './UserForm.css'; // Import the stylesheet
import { useNavigate } from 'react-router-dom';//let you programmatically move to a differrent page

const UserForm = () => {
    const navigate = useNavigate();

    // State to store form inputs
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        user_password: "",
        email: "",
    });

    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    // Handle form input changes
    const handleChange = (e) => { //this function updates the formData automatically
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        if (!formData.firstName || !formData.lastName || !formData.phoneNumber || !formData.user_password || !formData.email) {
            setError("All fields are required.");
            return false;
        }
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
            console.log("Validation fails")
            return;
        }

        // Call to backend for user creation
        try {
            const response = await axios.post("http://localhost:4000/api/createUser", {
                firstName: formData.firstName,
                lastName: formData.lastName,
                phoneNumber: formData.phoneNumber,
                user_password: formData.user_password,
                email: formData.email,
            });
            setMessage("User created successfully"); // Show success message
            setError(null); // Clear any previous errors
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Unknown error occurred';
            setError(`Error creating user: ${errorMessage}`);
            setMessage(null); // Clear any previous success messages
            console.log(err.response); 
        }
        
    };

     // Navigate to the create user page
     const goback = () => {
        navigate("/"); // Corrected the function call to navigate correctly
    }

    return (
        <div className="form-container">
            <h2>Create User</h2>
            <form onSubmit={handleSubmit} className="user-form">
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter first name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter last name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Enter phone number"
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
                <button type="submit" className="submit-button">Submit</button>

                {/* Change onChange to onClick and use navigate correctly */}
                <div onClick={goback} className="create-user-button">Go Back to Login</div>
            </form>

            {/* Show success or error messages */}
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default UserForm;
