console.log("in script: cart.js");
const user = localStorage.getItem("user");
document.addEventListener('DOMContentLoaded', () => {

	if (!user) {
		window.location.href = "login.jsp";
		return;
	}

	const userId = JSON.parse(user).userId;

	if (userId) {
		fetchCartData(userId);
	} else {
		window.location.href = "login.jsp";
	}
});


function fetchCartData(userId) {
	fetch(`http://localhost:8087/cart/user/${userId}`)
		.then(response => response.json())
		.then(data => {
			console.log("cart data fetched: ", Object.keys(data).length);
			//localStorage.setItem("cart", JSON.stringify(data));
			populateCartDetails(data);
		})
		.catch(error => {
			console.error("Error fetching product details:", error);
		});
}

function populateCartDetails(data) {

	console.log("cart data:", data);
	const tbody = document.querySelector(".table tbody"); // Target the table body
	tbody.innerHTML = ""; // Clear any existing rows

	data.forEach(cart => {
		cart.cartItems.forEach(item => {
			// Create a table row
			const row = document.createElement("tr");

			// Populate the row with the item's details
			row.innerHTML = `
                <td>
                    <img src="${item.image}" alt="${item.productName}" class="table__img" />
                </td>
                <td>
                    <h3 class="table__title">${item.productName}</h3>
                    <p class="table__description">Color: ${item.color}, Size: ${item.size}</p>
                </td>
                <td>
                    <span class="table__price">$${item.price.toFixed(2)}</span>
                </td>
                <td>
					<input type="number" value="${item.quantity}" class="quantity" data-item-id="${item.id}" min="1" />
                </td>
                <td>
                    <span class="subtotal">$${(item.price * item.quantity).toFixed(2)}</span>
                </td>
                <td>
                    <button class="delete-btn" data-item-id="${item.id}">Delete</button>
                </td>
            `;

			// Append the row to the table body
			tbody.appendChild(row);


		});
	});
	const userId = JSON.parse(user).userId;
	updateCartTotal(userId);



	/******************************************************
	 *                                                    *
	 *    🔄 CART QUANTITY INCREASE OR DECREASE lOGIC     *
	 *                                                    *
	 ******************************************************/


	// Add event listeners for quantity changes
	document.querySelectorAll(".quantity").forEach(input => {
		input.addEventListener("change", (event) => {
			const itemId = event.target.getAttribute("data-item-id");
			const newQuantity = parseInt(event.target.value);

			const oldQuantity = event.target.defaultValue;
			if (newQuantity > oldQuantity) {
				adjustCartQuantity(itemId, "increase");
			} else if (newQuantity < oldQuantity && newQuantity >= 1) {
				adjustCartQuantity(itemId, "decrease");
			} else {
				// Reset invalid input to old quantity
				event.target.value = oldQuantity;
			}
		});
	});


	function adjustCartQuantity(itemId, action) {
		const url = `http://localhost:8087/cart/${itemId}/item/${itemId}/${action}`;

		fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(response => {
				if (response.ok) {
					const input = document.querySelector(`input[data-item-id="${itemId}"]`);

					input.disabled = true;

					let newQuantity = parseInt(input.value);
					/*// Update the quantity value manually based on action
					if (action === "increase") {
						newQuantity++;
					} else if (action === "decrease" && newQuantity > 1) {
						newQuantity--;
					}
		
					// Update the input box value with the new quantity
					input.value = newQuantity;*/

					// Update the subtotal for this item
					const subtotalElement = input.closest('tr').querySelector('.subtotal');
					const price = parseFloat(input.closest('tr').querySelector('.table__price').innerText.replace('$', ''));
					subtotalElement.innerText = `$${(price * newQuantity).toFixed(2)}`;

					setTimeout(() => {
						// Re-enable input field after a small delay
						input.disabled = false;
					}, 1000);

				} else {
					console.error(`Failed to ${action} item quantity.`);
				}
			})
			.catch(error => {
				console.error(`Error during quantity ${action}:`, error);
			});
	}






	/******************************************************
	 *                                                    *
	 *          🔄 CART ITEM DELETE LOGIC                 *
	 *                                                    *
	 ******************************************************/





	// Add event listener for delete buttons
	const deleteButtons = document.querySelectorAll(".delete-btn");
	deleteButtons.forEach(button => {
		button.addEventListener("click", (event) => {
			const itemId = event.target.getAttribute("data-item-id");
			deleteCartItem(itemId, data);
		});
	});

	function deleteCartItem(itemId, data) {
		fetch(`http://localhost:8087/cart/delete/${itemId}`,
			{
				method: 'DELETE',
				headers: {
					"Content-Type": 'application/json',
				}
			})
			.then(response => {
				if (response.status === 204) { // Check if the response status is 204
					alert("Item deleted.");
					location.reload(); // Reload the page
				} else {
					console.error("Unexpected response status:", response.status);
				}
			})
			.catch(error => {
				console.error("Error deleting cart item:", error);
			});
	}
}




/******************************************************
 *                                                    *
 *          🔄 TOTAL CART PRICE UPDATE                *
 *                                                    *
 ******************************************************/

function updateCartTotal(userId) {
    fetch(`http://localhost:8087/cart/user/${userId}/totalBill`, { // Correct placeholder syntax
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Call json() method properly
    })
    .then(data => {
        const cartTotalElement = document.querySelector(".cart__total-price");
        cartTotalElement.innerHTML = `$${data}`; // Add currency symbol for better UI
    })
    .catch(error => console.error("Error while finding the total bill amount in cart.js:", error));
}
