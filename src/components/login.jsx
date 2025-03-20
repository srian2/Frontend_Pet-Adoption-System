import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Email: formData.email,
          Password: formData.password
        })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role); 

        localStorage.setItem("userId", data.userId); 
        alert("✅ Login successful! Redirecting...");
        setTimeout(() => {
          if (data.role === "admin") {
            navigate("/AdminDashboard"); // Redirect to Admin Dashboard
          } else {
            navigate("/dashboard"); // Redirect to User Dashboard
          }
        }, 500);
      } else {
        setErrorMessage(data.error || "❌ Invalid email or password.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMessage("❌ Server error. Please try again later.");
    }
  };
  return (
    <div className="login-wrapper">
      <div className="login-container-wrapper">
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
        <div className="info-container">
        <h2 className="adopt-text">
        <span className="adopt">ADOPT <span className="paw-icon">🐾</span></span> <br />
        <span className="dont-shop">DON'T SHOP</span>
        </h2>
          <p className="adopt-subtitle">Make A New Friend</p>
        </div>
      </div>
    </div>
  )};
export default Login;
