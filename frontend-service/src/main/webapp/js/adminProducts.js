let products = [];

    // Fetch and display products from API (mocked here)
async function fetchAndDisplayProducts() {
  try {
    // Fetch products from the API
    const response = await fetch('http://localhost:8087/products');
    const products = await response.json();

    // Check if the data is received and is an array
    if (Array.isArray(products) && products.length > 0) {
      // Get the table body element
      const tableBody = document.getElementById('productTableBody');
      tableBody.innerHTML = ''; // Clear existing content

      // Iterate through the products and display them
      products.forEach(product => {
        const row = document.createElement('tr');
        row.classList.add('border-gray-200'); // Add border class for styling

        // Add product details in table cells
        row.innerHTML = `
          <td class="p-3">${product.id}</td>
          <td class="p-3">${product.name}</td>
          <td class="p-3">₹${product.price}</td>
          <td class="p-3">₹${product.discountedPrice}</td>
          <td class="p-3">${product.quantity}</td>
          <td class="p-3">${product.category ? product.category.name : 'N/A'}</td>
          <td class="p-3">
            <button onclick="editProduct(${product.id})" class="bg-yellow-500 text-white px-4 py-2 rounded-md">Edit</button>
            <button onclick="deleteProduct(${product.id})" class="bg-red-500 text-white px-4 py-2 rounded-md ml-4">Delete</button>
          </td>
        `;

        // Append the new row to the table body
        tableBody.appendChild(row);
      });
    } else {
      console.error("No products found or invalid data format.");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Call the function to fetch and display products when the page loads
window.onload = fetchAndDisplayProducts;


    // Edit product function
    function editProduct(productId) {
      const product = products.find(p => p.id === productId);
      if (product) {
        document.getElementById('editName').value = product.name;
        document.getElementById('editPrice').value = product.price;
        document.getElementById('editDiscountedPrice').value = product.discountedPrice;
        document.getElementById('editQuantity').value = product.quantity;
        document.getElementById('editDescription').value = product.description;
        document.getElementById('editForm').classList.remove('hidden');
      }
    }

    // Save product changes
    async function saveProduct() {
      const updatedProduct = {
        id: products.find(p => p.name === document.getElementById('editName').value).id,
        name: document.getElementById('editName').value,
        price: document.getElementById('editPrice').value,
        discountedPrice: document.getElementById('editDiscountedPrice').value,
        quantity: document.getElementById('editQuantity').value,
        description: document.getElementById('editDescription').value,
      };

      try {
        const response = await fetch(`http://localhost:8087/products/${updatedProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedProduct),
        });

        if (response.ok) {
          fetchProducts();
        }
      } catch (error) {
        console.error("Error updating product:", error);
      }

      cancelEdit();
    }

    // Cancel editing product
    function cancelEdit() {
      document.getElementById('editForm').classList.add('hidden');
    }

    // Delete product
    async function deleteProduct(productId) {
      try {
        const response = await fetch(`http://localhost:8087/products/${productId}`, { method: 'DELETE' });
        if (response.ok) {
          fetchProducts();
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }

    // Initial fetch of products
    fetchAndDisplayProducts();