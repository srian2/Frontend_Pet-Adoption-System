import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [pets, setPets] = useState([]);
    const [adoptions, setAdoptions] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/users")
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error("Error fetching users:", error));

        fetch("http://localhost:3000/api/pets")
            .then(response => response.json())
            .then(data => setPets(data))
            .catch(error => console.error("Error fetching pets:", error));

        fetch("http://localhost:3000/api/adoptions")
            .then(response => response.json())
            .then(data => setAdoptions(data))
            .catch(error => console.error("Error fetching adoptions:", error));
    }, []);

    return (
        <div className="container">
            <h1>Admin Dashboard</h1>
            
            {/* Users Section */}
            <section className="section">
                <h2>Users</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th><th>Full Name</th><th>Email</th><th>Password</th>
                            <th>DOB</th><th>Photo</th><th>Address</th><th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.fullname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                    <td>{user.dob}</td>
                                    <td><img src={user.photo} alt="User" width="50" /></td>
                                    <td>{user.address}</td>
                                    <td>{user.phoneNumber}</td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="8">No users found.</td></tr>
                        )}
                    </tbody>
                </table>
            </section>

            {/* Pets Section */}
            <section className="section">
                <h2>Pets</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th><th>Species</th><th>Age</th><th>Breed</th>
                            <th>Description</th><th>Image</th>
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

            {/* Adoption Requests Section */}
            <section className="section">
                <h2>Adoption Requests</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Full Name</th><th>Email</th><th>Password</th><th>DOB</th>
                            <th>Photo</th><th>Address</th><th>Phone Number</th><th>Reason Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adoptions.length > 0 ? (
                            adoptions.map(request => (
                                <tr key={request.id}>
                                    <td>{request.fullname}</td>
                                    <td>{request.email}</td>
                                    <td>{request.password}</td>
                                    <td>{request.dob}</td>
                                    <td><img src={request.photo} alt="Adopter" width="50" /></td>
                                    <td>{request.address}</td>
                                    <td>{request.phoneNumber}</td>
                                    <td>{request.reasonstatus}</td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="8">No adoption requests.</td></tr>
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default AdminDashboard;
