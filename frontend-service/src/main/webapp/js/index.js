document.addEventListener("DOMContentLoaded", () => {
	const productsContainer = document.getElementById("products-container");
	const loadMoreButton = document.getElementById("load-more");

	// Fetch products from the API
	const fetchProducts = async () => {
		try {
			const response = await fetch("http://localhost:8087/products"); // Replace with your API URL
			if (!response.ok) throw new Error("Failed to fetch products");
			const products = await response.json();
			renderProducts(products.slice(0, 6)); // Render only the first 6 products
		} catch (error) {
			console.error("Error fetching products:", error);
			productsContainer.innerHTML = `<p class="error">Failed to load products. Please try again later.</p>`;
		}
	};

	// Function to render products
	const renderProducts = (products) => {
		productsContainer.innerHTML = ""; // Clear any existing products
		products.forEach((product) => {
			const productHTML = `
        <div class="product__item">
          <div class="product__banner">
            <a href="productDetails.jsp?productId=${product.id}" class="product__images">
              <img src="${product.imageUrl}" alt="${product.name}" class="product__img default" />
            </a>
          </div>
          <div class="product__content">
            <span class="product__category">${product.category.name}</span>
            <h3 class="product__title">${product.name}</h3>
            <div class="product__price flex">
              <span class="new__price">$${product.discountedPrice}</span>
              <span class="old__price">$${product.price}</span>
            </div>
          </div>
        </div>`;
			productsContainer.insertAdjacentHTML("beforeend", productHTML);
		});
	};

	// Load more button event
	loadMoreButton.addEventListener("click", () => {
		window.location.href = "product.jsp"; // Redirect to product.jsp
	});

	// Initial fetch
	fetchProducts();
});


function handleImageClick(category) {
	// Example: Redirect to a category page
	window.location.href = `explore.jsp?category=${category}`;

	// Alternatively, log or perform other actions
	console.log(`Category clicked: ${category}`);
}
const categoryList = document.getElementById('category-list');

    // Fetch categories from the API and dynamically populate the category list
    async function loadCategories() {
        try {
            const response = await fetch("http://localhost:8082/categories");
            if (!response.ok) throw new Error("Failed to fetch categories");

            const categories = await response.json();
//            console.log('Fetched Categories:', categories);  // Log the response to ensure the structure is correct

            // Ensure categories are available
            if (Array.isArray(categories) && categories.length > 0) {
                categories.forEach(category => {
                    const categoryItem = document.createElement('div');
                    categoryItem.classList.add('w-1/4', 'sm:w-1/3', 'lg:w-1/6', 'p-4');

                    categoryItem.innerHTML = `
                        <div class="bg-white rounded-full shadow-lg transition-transform transform hover:scale-105 pointer">
                            <div class="relative">
                                <img src="${category.imageName}" alt="${category.name}" class="w-full h-auto rounded-full object-cover">
                            </div>
                            <div class="p-4 text-center">
                                <a href="/products?category=${category.name}" class="text-lg font-medium text-gray-800 hover:text-blue-500 transition duration-300">
                                    ${category.name}
                                </a>
                            </div>
                        </div>
                    `;

                    categoryList.appendChild(categoryItem);
                });
            } else {
                categoryList.innerHTML = '<p>No categories available.</p>';
            }
        } catch (error) {
            console.error('Error loading categories:', error);
            categoryList.innerHTML = '<p class="error">Failed to load categories. Please try again later.</p>';
        }
    }

    // Call the loadCategories function when the page is loaded
    loadCategories();



/* Timer */

// Set the target date
const targetDate = new Date('December 31, 2024 23:59:59').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const timeLeft = targetDate - now;

  // Calculate time units
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  // Update the HTML elements
  document.getElementById('days').innerText = days < 10 ? '0' + days : days;
  document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
  document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
  document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;

  // Stop countdown when expired
  if (timeLeft < 0) {
    clearInterval(timerInterval);
    document.getElementById('countdown').innerHTML = "<p class='expired'>Sale Ended</p>";
  }
}

// Run the countdown every second
const timerInterval = setInterval(updateCountdown, 1000);
updateCountdown();
