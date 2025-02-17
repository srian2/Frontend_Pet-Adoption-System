// document.getElementById('loginForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent the form from submitting and refreshing the page

//     // Get form values
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     // Perform simple validation to ensure both fields are filled
//     if (email === '' || password === '') {
//         alert('Please fill in all fields.');
//         return;
//     }

//     // Placeholder for login functionality
//     if (email === 'test@example.com' && password === 'password123') {
//         alert('Login successful!');
//     } else {
//         alert('Invalid email or password.');
//     }
// });


document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Get input values
        const Email = document.getElementById('Email').value;
        const Password = document.getElementById('Password').value;

        try {
            const response = await fetch('http://localhost:3000/api/auth/login ', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Email, Password }) // ✅ Match backend case-sensitive fields
            });

            // Handle non-JSON responses (like HTML errors)
            const contentType = response.headers.get("Content-Type");
            if (!contentType || !contentType.includes("application/json")) {
                const errorText = await response.text();
                console.error('Unexpected response:', errorText);
                alert('Unexpected error occurred. Check console for details.');
                return;
            }

            const data = await response.json();

            if (response.ok) {
                alert('Login successful!');
                console.log('Token:', data.token);
                localStorage.setItem('authToken', data.token);
                window.location.href = 'dashboard.html';
            } else {
                alert('Error: ' + data.error);
            }
        } catch (error) {
            console.error('Error during login:', error.message);
            alert('An error occurred: ' + (error.message || 'Please try again later.'));
        }
    });
});
