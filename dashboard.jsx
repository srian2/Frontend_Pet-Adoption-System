import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
const API_URL = "http://localhost:3000/api/pets";
const Dashboard = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPet, setSelectedPet] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error("Failed to fetch pets");
                }
                const data = await response.json();
                setPets(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPets();
    }, []);
    const openModal = (pet) => {
        setSelectedPet(pet);
    };
    const closeModal = () => {
        setSelectedPet(null);
    };
    const handleAdopt = () => {
        if (selectedPet) {
            navigate("/adoption", { state: { pet: selectedPet } });
        }
    };
    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className="sidebar">
        <h2>🐾 AdoptMe</h2>
        <ul>
        <li><a href="/dashboard" className="active">Home</a></li>
        <li><a href="/addpet">Add Pet</a></li>
        <li><a href="/adoption">Adopt</a></li>
        <li><a href="/profile">Profile</a></li>
        <li><a href="/login">Logout</a></li>
        </ul>
    </div>
            {/* Main Content */}
            <div className="main-content">
                {/* Available Pets Section */}
                <div className="available-pets">
                    <h2 className="section-title">Available Pets</h2>
                    {loading && <p>Loading pets...</p>}
                    {error && <p className="error-message">Error: {error}</p>}

                    {/* Pets Grid */}
                    <div className="pets-grid">
                        {pets.length > 0 ? (
                            pets.map((pet) => (
                                <div key={pet.id} className="pet-card" onClick={() => openModal(pet)}>
                                    <img src={pet.imageUrl || "default-image.jpg"} alt={pet.name} />
                                    <h3>{pet.name}</h3>
                                </div>
                            ))
                        ) : (
                            !loading && <p>No pets available.</p>
                        )}
                    </div>
                </div>
                {/* Pet Care Ideas Section */}
                <div className="pet-care">
                    <h2 className="section-title">Pet Care Tips</h2>
                    <ul className="pet-care-list">
                        <li>🐶 Regular vet check-ups ensure good health.</li>
                        <li>🥩 Provide fresh food and clean water daily.</li>
                        <li>🏃 Ensure daily exercise and mental stimulation.</li>
                        <li>🛁 Maintain hygiene with proper grooming.</li>
                        <li>❤️ Give your pet love and attention.</li>
                    </ul>
                </div>
            </div>
            {/* Pet Details Modal */}
            {selectedPet && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close-btn" onClick={closeModal}>&times;</span>
                        <h2>{selectedPet.name}</h2>
                        <img src={selectedPet.imageUrl || "default-image.jpg"} alt={selectedPet.name} />
                        <div className="modal-details">
                            <p><strong>Species:</strong> {selectedPet.species}</p>
                            <p><strong>Breed:</strong> {selectedPet.breed}</p>
                            <p><strong>Age:</strong> {selectedPet.age} years</p>
                            <p><strong>Description:</strong> {selectedPet.description}</p>
                        </div>
                        <button className="adopt-button" onClick={handleAdopt}>Adopt</button>
                    </div>
                </div>
            )}
        </div>
    );};
export default Dashboard;
