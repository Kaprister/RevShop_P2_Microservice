document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.getElementById("products-container");
  const pagination = document.getElementById("pagination");
  const itemCount = document.getElementById("item-count");

  const itemsPerPage = 10;
  let currentPage = 1;
  let products = [];

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8087/products"); // Replace with your API URL
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      products = data; // Assign the response data to the products array
      renderProducts();
/*      renderPagination();
*/    } catch (error) {
      console.error("Error fetching products:", error);
      productsContainer.innerHTML = `<p class="error">Failed to load products. Please try again later.</p>`;
    }
  };

  // Function to render products
  const renderProducts = (page = 1) => {
    productsContainer.innerHTML = "";
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentProducts = products.slice(start, end);

    currentProducts.forEach((product) => {
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

    itemCount.textContent = products.length;
  };

  // Function to render pagination
  const renderPagination = () => {
    pagination.innerHTML = "";
    const totalPages = Math.ceil(products.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      const pageHTML = `<li><a href="#" class="pagination__link ${i === currentPage ? "active" : ""}" data-page="${i}">${i}</a></li>`;
      pagination.insertAdjacentHTML("beforeend", pageHTML);
    }

    pagination.addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.target.closest(".pagination__link");
      if (target) {
        currentPage = parseInt(target.dataset.page);
        renderProducts(currentPage);
        renderPagination();
      }
    });
  };

  // Initial load
  fetchProducts();
});
