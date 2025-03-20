import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./adoption.css";

const API_URL = "http://localhost:3000/api/adoptions";

const AdoptionForm = () => {
  const navigate = useNavigate();
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
  const [adoptionStatus, setAdoptionStatus] = useState(null); 
  const [formVisible, setFormVisible] = useState(true); 

  useEffect(() => {
    const savedStatus = localStorage.getItem("adoptionStatus");
    if (savedStatus && savedStatus !== "Pending") {
      setAdoptionStatus(savedStatus);
      setFormVisible(false); // Hide form if an adoption request exists
    }

    const interval = setInterval(fetchAdoptionStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchAdoptionStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/status`);
      const data = await response.json();

      if (data.adoptionRequest && data.adoptionRequest.status) {
        setAdoptionStatus(data.adoptionRequest.status);
        localStorage.setItem("adoptionStatus", data.adoptionRequest.status);
        setFormVisible(false); // Hide form after submission
      }
    } catch (error) {
      console.error("Error fetching adoption status:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    setMessage("");

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

      if (data.adoptionRequest && data.adoptionRequest.status) {
        setAdoptionStatus(data.adoptionRequest.status);
        localStorage.setItem("adoptionStatus", data.adoptionRequest.status);
      } else {
        setAdoptionStatus("Pending");
      }

      setSuccess(true);
      setMessage("🎉 Adoption request submitted successfully!");
      setFormVisible(false); // Hide form after successful submission
    } catch (err) {
      setError("❌ Failed to submit adoption request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adoptionStatus"); // Remove adoption status on logout
    navigate("/login");
  };

  return (
    <div className="adopt-page">
      <div className="sidebar">
        <h2>🐾 AdoptMe</h2>
        <ul>
          <li><a href="/dashboard">Home</a></li>
          <li><a href="/addpet">Add Pet</a></li>
          <li><a href="/adoption" className="active">Adopt</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </div>
      <div className="main-section">
        <div className="adoption-form-container">
          <h2>🐾 Adoption Form</h2>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{message}</p>}

          {formVisible && (
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
          )}

          {/* Show Adoption Status Only After Submission */}
          {adoptionStatus && !formVisible && (
            <div className={`adoption-status ${adoptionStatus.toLowerCase()}`}>
              <p>Status: {adoptionStatus}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};  

export default AdoptionForm;
