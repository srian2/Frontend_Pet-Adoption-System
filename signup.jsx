import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./signup.css";

const Signup = () => {
    const [formData, setFormData] = useState({
        fullname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setMessage("❌ Passwords do not match");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:3000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    Fullname: formData.fullname,   // ✅ Ensure correct field names
                    username: formData.username,
                    Email: formData.email,
                    Password: formData.password
                }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setMessage("✅ Signup successful! Redirecting to login...");
                setTimeout(() => navigate("/login"), 2000);
            } else {
                setMessage(`❌ ${data.error || "Signup failed"}`);
            }
        } catch (error) {
            console.error("Signup Error:", error);
            setMessage("❌ Server error. Please try again later.");
        }
    };
    

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h1 className="login-title">🐾 AdoptMe</h1>
                <h2 className="signup-title">Signup</h2>
                
                {message && <p className="message">{message}</p>}

                <div className="form-group">
                    <label>Fullname:</label>
                    <input type="text" name="fullname" placeholder="Enter your name" value={formData.fullname} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" name="username" placeholder="Choose a username" value={formData.username} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" placeholder="Create a password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Confirm Password:</label>
                    <input type="password" name="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} required />
                </div>
                
                <button type="submit" className="signup-button">Signup</button>
                <p className="login-link"> <a href="/login">Already have an Account?</a></p>
            </form>
        </div>
    );
};

export default Signup;

 
