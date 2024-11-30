document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user")); // Get user data from localStorage
    console.log("User from localStorage:", user);

    const headerActions = document.querySelector(".header__top-action");

    if (user && user.jwtToken) {
        // User is logged in
        headerActions.innerHTML = `
            <span>${user.username}</span>
            <a href="#" id="logout-btn" class="header__top-action1">Logout</a>
        `;
        updateCartCount(user.userId); // Pass userId to fetch the cart count

        // Logout functionality
        document.getElementById("logout-btn").addEventListener("click", () => {
            localStorage.removeItem("user"); // Remove user from localStorage
            window.location.href = "/login"; // Redirect to login
        });
    } else {
        // User is not logged in
        headerActions.innerHTML = `
            <a href="login.jsp" class="header__top-action1">Log In</a>
            <span>/</span>
            <a href="register.jsp" class="header__top-action1">Sign Up</a>
        `;
    }
});

// Function to update the cart count dynamically
async function updateCartCount(userId) {
    try {
        const response = await fetch(`http://localhost:8087/cart/user/${userId}/count`);
        if (!response.ok) throw new Error("Failed to fetch cart count");

        const cartCount = await response.json(); // Assuming API returns a count as a number
        console.log("Fetched cart count:", cartCount);

        // Update the cart count in the DOM
        const cartCountElement = document.getElementById("cart-count");
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
        }
    } catch (error) {
        console.error("Error fetching cart count:", error);
    }
}
