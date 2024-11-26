    document.addEventListener("DOMContentLoaded", () => {
        const user = JSON.parse(localStorage.getItem("user")); // Get user data from localStorage
        console.log("User from localStorage:", JSON.parse(localStorage.getItem("user")));

        const headerActions = document.querySelector(".header__top-action");

        if (user && user.jwtToken) {
        	// console.log(user, user.jwtToken);
            // User is logged in
            headerActions.innerHTML = `
            	<span> ${user.username}</span>
                <a href="#" id="logout-btn" class="header__top-action1">Logout</a>
            `;

            // Logout functionality
            document.getElementById("logout-btn").addEventListener("click", () => {
                localStorage.removeItem("user"); // Remove user from localStorage
                window.location.reload(); // Reload page
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