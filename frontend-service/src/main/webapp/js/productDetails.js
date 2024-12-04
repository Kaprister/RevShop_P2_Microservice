document.addEventListener('DOMContentLoaded', () => {
	const productId = new URLSearchParams(window.location.search).get('productId');
	const user = JSON.parse(localStorage.getItem("user"));
	if (productId) {
		fetchProductDetails(productId);
	} else {
		console.error("Product ID not found.");
	}

	function fetchProductDetails(productId) {
		fetch(`http://localhost:8087/products/${productId}`,
			{
				method: 'GET',
				headers: {
					"Content-Type": 'application/json',
					// "Authorization": `Bearer ${user.username}`
				}
			})
			.then(response => response.json())
			.then(data => {
				populateProductDetails(data);
			})
			.catch(error => {
				console.error('Error fetching product details:', error);
			});
	}

	function populateProductDetails(data) {
		document.getElementById('product-img').src = data.imageUrl;
		document.getElementById('product-title').textContent = data.name;
		document.getElementById('product-brand').querySelector('span').textContent = data.skuCode;
		document.getElementById('product-price').textContent = `$${data.price}`;
		document.getElementById('product-old-price').textContent = `$${data.discountedPrice}`;
		document.getElementById('product-save').textContent = `${((data.price - data.discountedPrice) / data.price * 100).toPrecision(2)}% Off`;
		document.getElementById('product-description').textContent = data.description;

		populateColors(['#FF5733', '#33FF57', '#3357FF', '#F3F3F3']); // Example colors
		populateSizes(['S', 'M', 'L', 'XL']); // Example sizes

		const addToCartBtn = document.getElementById('add-to-cart-btn');
		addToCartBtn.addEventListener('click', () => {
			addToCart(data);
		});
	}

	function populateColors(colors) {
		const colorList = document.getElementById('color-list');
		colors.forEach(color => {
			const colorItem = document.createElement('div');
			colorItem.className = 'color__item';
			colorItem.style.backgroundColor = color;
			colorItem.dataset.color = color;
			colorItem.addEventListener('click', () => selectColor(colorItem));
			colorList.appendChild(colorItem);
		});
	}

	function populateSizes(sizes) {
		const sizeList = document.getElementById('size-list');
		sizes.forEach(size => {
			const sizeItem = document.createElement('li');
			sizeItem.className = 'size__item';
			sizeItem.textContent = size;
			sizeItem.dataset.size = size;
			sizeItem.addEventListener('click', () => selectSize(sizeItem));
			sizeList.appendChild(sizeItem);
		});
	}

	function selectColor(selectedItem) {
		document.querySelectorAll('.color__item').forEach(item => {
			item.classList.remove('active');
		});
		selectedItem.classList.add('active');
	}

	function selectSize(selectedItem) {
		document.querySelectorAll('.size__item').forEach(item => {
			item.classList.remove('active');
		});
		selectedItem.classList.add('active');
	}
	function addToCart(product) {
		console.log(product.imageUrl);
		const quantityInput = document.querySelector('.quantity').value || 1;
		const selectedColor = document.querySelector('.color__item.active')?.dataset.color;
		const selectedSize = document.querySelector('.size__item.active')?.dataset.size;

		if (!selectedColor || !selectedSize) {
			alert('Please select a color and size.');
			return;
		}
		const cartItem = {
			image: product.imageUrl,
			productName: product.name,
			productId: product.id,
			quantity: parseInt(quantityInput),
			price: product.price,
			discountedPrice: product.discountedPrice,
			color: selectedColor,
			size: selectedSize,
		};

		fetch("http://localhost:8090/cart/add", {
			method: 'POST',
			headers: {
				"Content-Type": 'application/json',
				"Authorization": `Bearer ${user.jwtToken}`,
			},
			body: JSON.stringify(
				{
					"userId": user.userId,
					"cartItems": [cartItem]
				},
			),
		})
			.then(response => {
				if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
				return response.json();
			})
			.then(() => {
				alert("Product added to cart!");
				updateCartCount(user.userId);
			})
			.catch(() => alert("Failed to add product to cart."));
	}
	const tabs = document.querySelectorAll(".detail__tab");
	const tabContents = document.querySelectorAll(".details__tab-content");

	function switchTab(event) {
		tabs.forEach(tab => tab.classList.remove("active-tab"));
		tabContents.forEach(content => content.classList.remove("active-tab"));

		event.target.classList.add("active-tab");
		const targetContent = document.querySelector(event.target.dataset.target);
		if (targetContent) {
			targetContent.classList.add("active-tab");
		}
	}

const wishlistBtn = document.getElementById('wishlist-heart');
wishlistBtn.addEventListener('click', () => {
    handleLike();
});
function handleLike() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.userId) {
        alert("Please log in to add items to your wishlist.");
        return;
    }

    fetch(`http://localhost:8086/wishlist/addProduct/${user.userId}/${productId}`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
    })
        .then(response => {
            if (response.status === 201) {
                alert("Product added to wishlist successfully!");
                const likeButton = document.getElementById("wishlist-heart");
                likeButton.classList.toggle("liked"); // Optional: Change heart icon style
                return response.json();
            } else {
                throw new Error(`Failed with status code: ${response.status}`);
            }
        })
        .catch(error => {
            console.error("Failed to add product to wishlist:", error);
            alert("Failed to add product to wishlist.");
        });
}


	tabs.forEach(tab => {
		tab.addEventListener("click", switchTab);
	});
});




