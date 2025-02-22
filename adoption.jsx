import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./adoption.css";

const API_URL = "http://localhost:3000/api/adoptions"; // Backend API URL

const AdoptionForm = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    petName: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit adoption request");
      }

      const data = await response.json();
      console.log("Form submitted successfully:", data);
      setSuccess(true);
      setMessage("🎉Adoption request submitted successfully! Thank You! Redirecting... 🐾");

      // // Clear form after submission
      // setFormData({
      //   name: "",
      //   email: "",
      //   phone: "",
      //   address: "",
      //   petName: "",
      //   reason: "",
      // });

      // Wait 2 seconds, then redirect to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
      
    } catch (err) {
      console.error("Error:", err);
      setError("❌ Failed to submit adoption request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <div className="adoption-form-container">
        <h2>🐾 Adoption Form</h2>
        
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{message}</p>}

        <form onSubmit={handleSubmit} className="adoption-form">
          <div className="input-group">
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Phone:</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Address:</label>
            <textarea name="address" value={formData.address} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Pet Name:</label>
            <input type="text" name="petName" value={formData.petName} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Reason for Adoption:</label>
            <textarea name="reason" value={formData.reason} onChange={handleChange} required />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdoptionForm;
