const user = JSON.parse(localStorage.getItem("user"));
const userId = user.userId;
const loadingElement = document.getElementById("loading");
const errorElement = document.getElementById("error");
const noProductsElement = document.getElementById("no-products");
const productsContainer = document.getElementById("products");

const fetchWishlist = async () => {
    try {
        const response = await fetch(`http://localhost:8086/wishlist/user/${userId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch wishlist");
        }
        const data = await response.json();
        return data.productIds;
    } catch (error) {
        showError("Failed to fetch wishlist");
        console.error("Error fetching wishlist:", error);
        return [];
    }
};

const fetchProducts = async (wishlist) => {
    try {
        const productPromises = wishlist.map(async (productId) => {
            const response = await fetch(`http://localhost:8082/products/${productId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch product data");
            }
            return await response.json();
        });

        return await Promise.all(productPromises);
    } catch (error) {
        showError("Failed to fetch liked products");
        console.error("Error fetching liked products:", error);
        return [];
    }
};

const showError = (message) => {
    loadingElement.classList.add("hidden");
    errorElement.classList.remove("hidden");
    errorElement.querySelector("p").textContent = message;
};
const renderProducts = (products) => {
    loadingElement.classList.add("hidden");

    if (products.length === 0) {
        noProductsElement.classList.remove("hidden");
        return;
    }

    productsContainer.classList.remove("hidden");
    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "relative bg-white border border-gray-200 rounded-lg shadow-lg transition-transform hover:scale-10";

        productCard.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}" class="w-full h-96 object-fit rounded-t-lg" />
            <div class="p-5">
                <h3 class="text-lg font-semibold text-gray-800">${product.name}</h3>
                <p class="text-gray-600 mt-2 truncate">${product.description}</p>
                <div class="flex items-center justify-between mt-4">
                    <p class="text-xl font-bold text-gray-900">₹${product.discountedPrice || product.price}</p>
                </div>
                <div class="flex justify-between gap-10 mt-6">
                    <button class="add-to-cart w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors">Add to Cart</button>
                    <button class="remove-from-wishlist w-1/2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-colors">Remove</button>
                </div>
            </div>
        `;

        productCard.querySelector(".add-to-cart").addEventListener("click", () => {
             window.location.href = `/productDetails.jsp?productId=${product.id}`;
        });
        productCard.querySelector(".remove-from-wishlist").addEventListener("click", async () => {
                    try {
                        const response = await fetch(`http://localhost:8086/wishlist/removeProduct/${userId}/${product.id}`, {
                            method: "DELETE"
                        });
                        if (!response.ok) {
                            throw new Error("Failed to remove product");
                        }
                        productCard.remove();
                        alert("Product removed successfully!");
                    } catch (error) {
                        alert("Failed to remove product");
                        console.error("Error removing product:", error);
                    }
                });

                productsContainer.appendChild(productCard);
            });
        };

        const initialize = async () => {
            const wishlist = await fetchWishlist();
            const products = await fetchProducts(wishlist);
            renderProducts(products);
        };

        initialize();
