console.log("Script Loaded: checkout.js");

const user = localStorage.getItem("user");
const userId = JSON.parse(user).userId;
let cartItems = []; // Declare cartItems globally to access it later

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
            cartItems = userCart.flatMap(entry => entry.cartItems); // Populate global cartItems array
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

async function placeOrder({ billingAddress, paymentMethod }) {
    console.log("Inside place order function");

    if (cartItems.length === 0) {
        console.error("Cart is empty. Cannot place an order.");
        alert("Your cart is empty. Please add items before placing an order.");
        return;
    }

    const total = document.querySelector(".order__grand-total").innerText.replace("$", ""); // Example of getting total
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

    const orderData = {
        totalAmount: parseFloat(total),
        userId,
        status: "PENDING",
        billingAddress,
        orderType: paymentMethod === "cod" ? "Cash On Delivery" : "Online Payment",
        orderLineItems: cartItems.map(item => ({
            productId: item.productId,
            name: item.productName,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
        })),
    };

    try {
        const response = await fetch("http://localhost:8084/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(orderData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Order placed successfully:", result);
        alert("Order placed successfully!");
        await deleteCartItems();
        window.location.href = "/order-success"; // Redirect to success page
    } catch (error) {
        console.error("Error placing order:", error);
    }
}

 async function deleteCartItems() {
    try {
        await fetch(`http://localhost:8087/cart/deleteAll/${userId}`, { method: "DELETE" });
        console.log("Cart cleared.");
    } catch (error) {
        console.error("Error clearing cart:", error);
    }
}

function handleRazorpayPayment() {
    const total = document.querySelector(".order__grand-total").innerText.replace("$", "");
    const totalAmount = parseFloat(total) * 100; // Convert to smallest currency unit

    const options = {
        key: "rzp_test_kOZuSgBkSmpz5o", // Replace with your Razorpay API key
        amount: totalAmount,
        currency: "INR",
        name: "E-Commerce Checkout",
        description: "Order Payment",
        handler: async function (response) {
            console.log("Razorpay Payment Success:", response);

            // Create order data
            const billingAddress = document.getElementById("billingAddress").value.trim();
            const orderData = {
                totalAmount: parseFloat(total),
                userId,
                status: "PENDING",
                billingAddress,
                orderType: "Online Payment",
                orderLineItems: cartItems.map(item => ({
                    productId: item.productId,
                    name: item.productName,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image,
                })),
            };

            // Call placeOrder and handlePaymentApi
            await placeOrder(orderData);
            await handlePaymentApi(orderData, response.razorpay_payment_id, response.razorpay_order_id);
        },
        prefill: {
            name: "User", // Replace with dynamic user details
            email: "user@example.com",
            contact: "1234567890",
        },
        notes: {
            address: document.getElementById("billingAddress").value.trim(),
        },
        theme: {
            color: "#3399cc",
        },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
}


const handlePaymentApi = async (orderData, paymentID, orderID) => {
    const paymentData = {
        orderId: orderID || "N/A", // Razorpay does not return an order ID by default
        paymentId: paymentID,
        paymentLink: "http://localhost:8085/api/payments",
        status: "SUCCESS",
        totalAmount: orderData.totalAmount,
        userId: orderData.userId,
    };

    try {
        const response = await fetch("http://localhost:8085/api/payments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Payment API call successful:", result);
    } catch (error) {
        console.error("Error calling payment API:", error);
    }
};
