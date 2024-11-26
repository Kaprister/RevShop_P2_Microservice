console.log("in script:login.js")
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
            const response = await fetch("http://localhost:8087/auth/login", {
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

            if (user.role === "BUYER") {
                window.location.href = "/";
            } else {
                window.location.href = "/admin";
            }
        } catch (error) {
            alert("Login failed. Please check your credentials.");
            console.error("Login error:", error);
        }
    });
});
