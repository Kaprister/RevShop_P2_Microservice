const user = localStorage.getItem("user");
const userId = JSON.parse(user).userId;
const token = JSON.parse(user).jwtToken;

document.addEventListener("DOMContentLoaded", function () {
  const productForm = document.getElementById("productForm");
  const categorySelect = document.getElementById("categoryId");

  // Fetch categories and populate the dropdown
  async function fetchCategories() {
    try {
      const response = await fetch("http://localhost:8087/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const categories = await response.json();
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  // Handle form submission
  productForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData();
    const imageFile = document.getElementById("image_file").files[0];

    // Construct product object
    const productData = {
      name: document.getElementById("name").value,
      description: document.getElementById("description").value,
      skuCode: document.getElementById("skuCode").value,
      price: parseFloat(document.getElementById("price").value),
      discountedPrice: parseFloat(document.getElementById("discountedPrice").value),
      quantity: parseInt(document.getElementById("quantity").value),
      category: {
        id: parseInt(document.getElementById("categoryId").value),
        name: categorySelect.options[categorySelect.selectedIndex].text,
      },
    };

    // Append product and image to FormData
    formData.append("product", JSON.stringify(productData));
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch("http://localhost:8087/products", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert("Product added successfully!");
        productForm.reset();
        categorySelect.value = "";
      } else {
        alert("Failed to add product!");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred. Please try again.");
    }
  });

  // Initialize categories
  fetchCategories();
});
