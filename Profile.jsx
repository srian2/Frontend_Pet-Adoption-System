import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    dob: "",
    phone: "",
    address: "",
    profileImage: null,
  });

  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/auth/get-user-profile/1`);

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await response.json();
        console.log("Fetched Data:", data);
        if (data.user) {
          setUser({
            fullname: data.user.Fullname || "",
            email: data.user.Email || "",
            dob: data.user.dob ? data.user.dob.split("T")[0] : "",
            phone: data.user.phoneNumber || "",
            address: data.user.address || "",
            profileImage: data.user.photo || null,
          });
          setPreview(data.user.photo || null);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUser({ ...user, profileImage: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Fullname", user.fullname);
    formData.append("dob", user.dob);
    formData.append("phoneNumber", user.phone);
    formData.append("Email", user.email);
    formData.append("address", user.address);

    if (user.profileImage && user.profileImage instanceof File) {
      formData.append("profileImage", user.profileImage);
    }
    try {
      const response = await fetch("http://localhost:3000/api/auth/update-profile/1", {
        method: "PUT",
        body: formData,
      });
      const data = await response.json();
      console.log("Update Response:", data);
      if (response.ok) {
        setMessage("✅ Profile updated successfully!");
        setUser((prevUser) => ({
          ...prevUser,
          profileImage: data.user?.photo || prevUser.profileImage,
        }));
        setPreview(data.user?.photo || prevUser.profileImage);
      } else {
        setMessage(`❌ ${data.error || "Update failed!"}`);
      }
    } catch (error) {
      setMessage("❌ Server error. Please try again later.");
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="profile">
          {/* Sidebar */}
          <div className="sidebar">
        <h2>🐾 AdoptMe</h2>
        <ul>
        <li><a href="/dashboard" >Home</a></li>
        <li><a href="/addpet">Add Pet</a></li>
        <li><a href="/adoption">Adopt</a></li>
        <li><a href="/profile" className="active">Profile</a></li>
        <li><a href="/login">Logout</a></li>
        </ul>
    </div>
      {/* Profile Section */}
      <div className="profile-section">
        {/* Profile Picture Section */}
        <div className="profile-picture-container">
          <img
            src={preview || "https://via.placeholder.com/150"}
            alt="Profile"
            className="profile-image"
          />
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div> 
        {/* Profile Details Form */}
        <form className="profile-form" onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" name="fullname" value={user.fullname} onChange={handleChange} />
          <label>Date of Birth</label>
          <input type="date" name="dob" value={user.dob} onChange={handleChange} />
          <label>Phone Number</label>
          <input type="text" name="phone" value={user.phone} onChange={handleChange} />
          <label>Email</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} />
          <label> Address</label>
          <input type="text" name="address" value={user.address} onChange={handleChange} />
          {/* Submit Button */}
          <button type="submit" className="submit-btn">Update Profile</button>
          {/* Success/Error Message */}
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
};
export default Profile;
