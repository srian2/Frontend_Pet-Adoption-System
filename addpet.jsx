import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./addPet.css"; // Ensure correct path

const API_URL = "http://localhost:3000/api/pets";

const AddPet = () => {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    age: "",
    breed: "",
    description: "",
  });

  const [file, setFile] = useState(null);
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setPets(data))
      .catch((error) => console.error("Error fetching pets:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const existingPet = pets.find(
        (pet) =>
          pet.name === formData.name &&
          pet.species === formData.species &&
          pet.age === formData.age &&
          pet.breed === formData.breed &&
          pet.description === formData.description
      );

      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      if (file) {
        formDataToSend.append("image", file);
      }

      const method = existingPet ? "PUT" : "POST";
      const url = existingPet ? `${API_URL}/${existingPet.id}` : API_URL;

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (!response.ok) throw new Error("Failed to save pet");

      const updatedPet = await response.json();

      setPets((prev) =>
        existingPet
          ? prev.map((pet) => (pet.id === existingPet.id ? updatedPet.pet : pet))
          : [...prev, updatedPet.pet]
      );

      alert(existingPet ? "Pet updated successfully!" : "Pet added successfully!");
      setFormData({ name: "", species: "", age: "", breed: "", description: "" });
      setFile(null);
    } catch (error) {
      console.error("Error saving pet:", error);
      alert("Error: Could not save pet.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to delete pet");

      alert("Pet deleted successfully!");
      setPets((prev) => prev.filter((pet) => pet.name !== formData.name));
      setFormData({ name: "", species: "", age: "", breed: "", description: "" });
    } catch (error) {
      console.error("Error deleting pet:", error);
      alert("Error: Could not delete pet.");
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h2>🐾 AdoptMe</h2>
        <ul>
          <li><a href="/dashboard">Home</a></li>
          <li><a href="/add-pet" className="active">Add Pet</a></li>
          <li><a href="/adoption">Adopt</a></li>
          <li><a href="/Profile">Profile</a></li>
          <li><a href="/login">Logout</a></li>
        </ul>
      </div>

      <div className="content">
        <div className="add-pet-form">
          <h2>Add a Pet</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label>Pet Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

            <label>Species:</label>
            <input type="text" name="species" value={formData.species} onChange={handleChange} required />

            <label>Age:</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} required />

            <label>Breed:</label>
            <input type="text" name="breed" value={formData.breed} onChange={handleChange} required />

            <label>Description:</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required />

            <label>Choose Photo:</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />

            <div className="button-group">
              <button type="submit" className="submit-btn">Add Pet</button>
              <button type="button" onClick={handleDelete} className="delete-btn">Delete Pet</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPet;
