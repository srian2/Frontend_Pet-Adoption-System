document.addEventListener("DOMContentLoaded", () => {
    // Logout button functionality
    const logoutBtn = document.querySelector(".logout-btn");
    logoutBtn.addEventListener("click", () => {
        const confirmLogout = confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            // Redirect to login page or perform logout logic
            alert("You have been logged out.");
            window.location.href = "/login"; // Adjust the path to your login page
        }
    });

    // Toggle sections functionality
    const sections = document.querySelectorAll(".section h2");
    sections.forEach((sectionHeader) => {
        sectionHeader.addEventListener("click", () => {
            const content = sectionHeader.nextElementSibling;
            if (content.style.display === "none") {
                content.style.display = "block";
                sectionHeader.classList.remove("collapsed");
            } else {
                content.style.display = "none";
                sectionHeader.classList.add("collapsed");
            }
        });
    });

    // Dynamically display available pets
    const petsContainer = document.getElementById("available-pets");

    // Fetch pets from local storage
    const pets = JSON.parse(localStorage.getItem("pets")) || [];

    // Display each pet
    pets.forEach((pet) => {
        const petCard = document.createElement("div");
        petCard.classList.add("pet-card");

        petCard.innerHTML = `
            <img src="${pet.image || 'https://via.placeholder.com/150'}" alt="${pet.name}">
            <div class="pet-details">
                <h3>${pet.name}</h3>
                <p><strong>Age:</strong> ${pet.age} years</p>
                <p><strong>Type:</strong> ${pet.type}</p>
                <p><strong>Breed:</strong> ${pet.breed}</p>
                <p><strong>Description:</strong> ${pet.description}</p>
            </div>
        `;

        petsContainer.appendChild(petCard);
    });
});

