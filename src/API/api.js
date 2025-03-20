const API_URL = "http://localhost:3000/api/auth"; // Backend URL

const signup = async () => {
    try {
        const response = await axios.post(`${API_URL}/signup`, {
            Fullname: "Test User",
            username: "test123",
            Email: "test@example.com",
            Password: "123456"
        });
        console.log(response.data);
    } catch (error) {
        console.error("Signup Error:", error.response?.data || error.message);
    }
};
