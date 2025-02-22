import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./addPet.css"; // Ensure correct path

const API_URL = "http://localhost:3000/api/pets"; // ✅ Backend handles both pet data & image

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

  // ✅ Fetch Pets from Backend
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setPets(data))
      .catch((error) => console.error("Error fetching pets:", error));
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle File Selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Store the selected file
  };

  // ✅ Add or Update Pet (Send Data to Backend)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Check if a pet with the same details already exists
      const existingPet = pets.find(
        (pet) =>
          pet.name === formData.name &&
          pet.species === formData.species &&
          pet.age === formData.age &&
          pet.breed === formData.breed &&
          pet.description === formData.description
      );

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("species", formData.species);
      formDataToSend.append("age", formData.age);
      formDataToSend.append("breed", formData.breed);
      formDataToSend.append("description", formData.description);

      if (file) {
        formDataToSend.append("image", file);
      }

      const method = existingPet ? "PUT" : "POST";
      const url = existingPet ? `${API_URL}/${existingPet.id}` : API_URL;

      const response = await fetch(url, {
        method,
        body: formDataToSend, // ✅ Send FormData (not JSON)
      });

      if (!response.ok) throw new Error("Failed to save pet");

      const updatedPet = await response.json();

      // ✅ Update pet list
      setPets((prev) =>
        existingPet
          ? prev.map((pet) => (pet.id === existingPet.id ? updatedPet.pet : pet))
          : [...prev, updatedPet.pet]
      );

      alert(existingPet ? "Pet updated successfully!" : "Pet added successfully!");

      // Reset form
      setFormData({ name: "", species: "", age: "", breed: "", description: "" });
      setFile(null);
    } catch (error) {
      console.error("Error saving pet:", error);
      alert("Error: Could not save pet.");
    }
  };

  // ✅ Handle Delete Pet by Matching All Details
  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/delete`, { // ✅ Change API endpoint
        method: "POST", // ✅ Change to POST
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
    <div className="main-container">
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

          {/* ✅ File Upload Input */}
          <label>Choose Photo:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />

          <div className="button-group">
            <button type="submit" className="submit-btn">
              Add Pet
            </button>

            {/* ✅ Delete Button */}
            <button type="button" onClick={handleDelete} className="delete-btn">
              Delete Pet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPet;
