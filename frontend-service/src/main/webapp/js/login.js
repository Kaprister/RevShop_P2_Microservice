console.log("in script: login.js");
document.addEventListener("DOMContentLoaded", () => {
	const loginForm = document.getElementById("loginForm");
	const togglePassword = document.getElementById("togglePassword");
	const passwordInput = document.getElementById("password");

	let isPasswordVisible = false;

	loginForm.addEventListener("submit", async (e) => {
		e.preventDefault();

		const username = document.getElementById("username").value;
		const password = document.getElementById("password").value;

        try {
            const response = await fetch("http://localhost:8081/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

			if (!response.ok) throw new Error("Login failed");

			const user = await response.json();

			alert("Login successful!");
			console.log("User details:", user);

			// Save user details in localStorage
			localStorage.setItem("user", JSON.stringify(user));

			// Fetch and store cart data
			if (user.role === "BUYER") {
				//await fetchCartData(user.userId); // Fetch and store cart data
				window.location.href = "/";
			} else {
				window.location.href = "/admin";
			}
		} catch (error) {
			alert("Login failed. Please check your credentials.");
			console.error("Login error:", error);
		}
	});



	// Function to fetch and store cart data in local storage
	async function fetchCartData(userId) {
		try {
			const response = await fetch(`http://localhost:8087/cart/user/${userId}`);
			if (!response.ok) throw new Error("Failed to fetch cart data");

			const cartData = await response.json();
			console.log("Fetched cart data:", cartData);

			// Save cart data to local storage
			localStorage.setItem("cart", JSON.stringify(cartData));
		} catch (error) {
			console.error("Error fetching cart data:", error);
		}
	}

	// Call the function to initialize the count when the page loads
	updateCartCount();

	// Optional: Add a listener to dynamically update count on localStorage changes
	window.addEventListener("storage", updateCartCount);
});
