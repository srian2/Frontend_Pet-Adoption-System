import React, { useState } from "react";
import { useNavigate, Link} from "react-router-dom";
// import { loginUser } from "../API/api"; // Import API function
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const hardcodedEmail = "admin@example.com";
    const hardcodedPassword = "admin123";

    console.log("Entered Email:", formData.email);
    console.log("Entered Password:", formData.password);
  
    if (formData.email.trim() === hardcodedEmail && formData.password.trim() === hardcodedPassword) {
      alert("✅ Login successful! Redirecting to dashboard...");
      localStorage.setItem("token", "dummy-token"); // Store token (replace with real one later)
      
      setTimeout(() => {
        navigate("/dashboard"); // Redirect to the dashboard after a small delay
      }, 500);
    } else {
      setErrorMessage("❌ Invalid email or password.");
    }
  };
  

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">🐾 AdoptMe</h1>
        <h2 className="login-subtitle">Welcome back!</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Login</button>
        </form>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
