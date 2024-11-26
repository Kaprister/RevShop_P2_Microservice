console.log("in script:register.js")
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");

    togglePassword.addEventListener("click", () => {
        const type = passwordInput.type === "password" ? "text" : "password";
        passwordInput.type = type;
        togglePassword.classList.toggle("fa-eye");
        togglePassword.classList.toggle("fa-eye-slash");
    });

    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(signupForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("http://localhost:8087/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: data.username,
                    email: data.email,
                    role: data.role === "1" ? "SELLER" : "BUYER",
                    firstName: data.firstname,
                    lastName: data.lastname,
                    phone: data.phone,
                    password: data.password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.errors) {
                    for (const [key, value] of Object.entries(errorData.errors)) {
                        const errorElement = document.getElementById(`${key}Errors`);
                        errorElement.innerHTML = value.map((err) => `<li>${err}</li>`).join("");
                    }
                }
                alert("Registration failed! Check your details.");
            } else {
                alert("Registration successful!");
                window.location.href = "login.jsp";
            }
        
        } catch (error) {
            console.error("Error:", error);
        }
    });
});