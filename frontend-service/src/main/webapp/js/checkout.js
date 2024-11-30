console.log("Script Loaded: checkout.js");

const user = localStorage.getItem("user");
const userId = JSON.parse(user).userId;

document.addEventListener("DOMContentLoaded", () => {
    fetchCartItems(userId);
});

function fetchCartItems(userId) {
    fetch(`http://localhost:8087/cart/user/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const userCart = data.filter(entry => entry.userId === userId);
        const cartItems = userCart.flatMap(entry => entry.cartItems); // Flatten all cart items
        const orderTableBody = document.querySelector(".order__table tbody");
        const summaryTable = document.querySelector(".order__summary");

        // Clear existing cart items in the scrollable table
        orderTableBody.innerHTML = "";

        // Populate cart items in the table
        cartItems.forEach(item => {
            const row = document.createElement("tr");

            const itemTotal = item.price * item.quantity;

            row.innerHTML = `
                <td>
                    <img src="${item.image}" alt="" class="order__img" />
                </td>
                <td>
                    <h3 class="table__title">${item.productName}</h3>
                    <p class="table__quantity">Size: ${item.size}, Color: ${item.color}, x ${item.quantity}</p>
                </td>
                <td><span class="table__price">$${itemTotal.toFixed(2)}</span></td>
            `;
            orderTableBody.appendChild(row);
        });

        // Calculate and update Subtotal, Shipping, and Total
        updateCartTotal(userId, summaryTable);
    })
    .catch(error => console.error("Error while fetching cart items:", error));
}

function updateCartTotal(userId, summaryTable) {
    fetch(`http://localhost:8087/cart/user/${userId}/totalBill`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(subtotal => {
        summaryTable.querySelector("tr:nth-child(1) .table__price").innerText = `$${subtotal.toFixed(2)}`;

        // Shipping logic based on subtotal
        let shippingCost = 0;
        if (subtotal < 500) {
            shippingCost = 45; // Shipping fee of 45 rupees if subtotal is less than 500
        }

        summaryTable.querySelector("tr:nth-child(2) .table__price").innerText = shippingCost === 0 ? "Free Shipping" : `₹${shippingCost}`;

        // Calculate and update the total
        const total = subtotal + shippingCost;
        summaryTable.querySelector("tr:nth-child(3) .order__grand-total").innerText = `$${total.toFixed(2)}`;
    })
    .catch(error => console.error("Error while finding the total bill amount in cart.js:", error));
}
