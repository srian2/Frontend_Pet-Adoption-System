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

  useEffect(() => {
    fetch("http://localhost:5000/api/user/profile")
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching profile:", error));
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

  return (
    <div className="main-container">
      <div className="profile-container">
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
        <form>
          <label>Name</label>
          <input type="text" name="fullname" value={user.fullname} onChange={handleChange} />

          <label>Date of Birth</label>
          <input type="date" name="dob" value={user.dob} onChange={handleChange} />

          <label>Phone Number</label>
          <input type="text" name="phone" value={user.phone} onChange={handleChange} />

          <label>Email</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} />

          <label>Home Address</label>
          <input type="text" name="address" value={user.address} onChange={handleChange} />
        </form>
      </div>
    </div>
  );
};

export default Profile;

