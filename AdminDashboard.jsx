import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [pets, setPets] = useState([]);
    const [adoptions, setAdoptions] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [newPet, setNewPet] = useState({
        name: "",
        species: "",
        age: "",
        breed: "",
        description: "",
        image: null
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/api/auth/getAllUsers")
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error("Error fetching users:", error));

        fetch("http://localhost:3000/api/pets")
            .then(response => response.json())
            .then(data => setPets(data))
            .catch(error => console.error("Error fetching pets:", error));

        fetch("http://localhost:3000/api/adoptions/getAdoptions")
            .then(response => response.json())
            .then(data => setAdoptions(data.adoptions))
            .catch(error => console.error("Error fetching adoptions:", error));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");  // Remove auth token
        navigate("/login"); // Redirect to login page
    };

    return (
        <div className="container">
            <div className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
            
            <section className="section">
                <h2>Users</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th><th>Full Name</th><th>Email</th><th>DOB</th><th>Photo</th><th>Address</th><th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.Fullname}</td>
                                    <td>{user.Email}</td>
                                    <td>{user.dob}</td>
                                    <td><img src={user.photo} alt="User" width="50" /></td>
                                    <td>{user.address}</td>
                                    <td>{user.phoneNumber}</td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="7">No users found.</td></tr>
                        )}
                    </tbody>
                </table>
            </section>

            <section className="section">
                <h2>Pets</h2>
                <button className="add-pet-btn" onClick={() => setIsPopupOpen(true)}>Add Pet</button>
                
                {isPopupOpen && (
                    <div className="popup">
                        <div className="popup-content">
                            <h2>Add a New Pet</h2>
                            <form>
                                <input type="text" name="name" placeholder="Pet Name" required />
                                <input type="text" name="species" placeholder="Species" required />
                                <input type="number" name="age" placeholder="Age" required />
                                <input type="text" name="breed" placeholder="Breed" required />
                                <input type="text" name="description" placeholder="Description" required />
                                <input type="file" name="image" accept="image/*" required />
                                <button type="submit">Add Pet</button>
                                <button type="button" className="close-btn" onClick={() => setIsPopupOpen(false)}>Cancel</button>
                            </form>
                        </div>
                    </div>
                )}

                <table>
                    <thead>
                        <tr>
                            <th>Name</th><th>Species</th><th>Age</th><th>Breed</th><th>Description</th><th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pets.length > 0 ? (
                            pets.map(pet => (
                                <tr key={pet.id}>
                                    <td>{pet.name}</td>
                                    <td>{pet.species}</td>
                                    <td>{pet.age}</td>
                                    <td>{pet.breed}</td>
                                    <td>{pet.description}</td>
                                    <td><img src={pet.imageUrl} alt="Pet" width="50" /></td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="6">No pets available.</td></tr>
                        )}
                    </tbody>
                </table>
            </section>

            <section className="section">
                <h2>Adoption Requests</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Full Name</th><th>Email</th>
                            <th>Pet Name</th><th>Address</th><th>Phone Number</th><th>Reason</th><th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adoptions.length > 0 ? (
                            adoptions.map(request => (
                                <tr key={request.id}>
                                    <td>{request.name}</td>
                                    <td>{request.email}</td>
                                    <td>{request.petName}</td>
                                    <td>{request.address}</td>
                                    <td>{request.phone}</td>
                                    <td>{request.reason}</td>
                                    <td>
                                        <select value={request.status}>
                                            <option value="Pending">Pending</option>
                                            <option value="Approved">Approved</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="7">No adoption requests.</td></tr>
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default AdminDashboard;
