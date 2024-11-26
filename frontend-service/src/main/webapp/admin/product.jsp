<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Product List</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet">
  <style>
    /* You can add any additional styles here */
  </style>
</head>
<body class="bg-gray-50">
	<header><jsp:include page="../components/adminHeader.jsp"/></header>
  <div class="mx-auto max-w-screen-xl px-4 pt-8 mt-8 sm:py-12">
    <!-- Head Component -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold">Product</h1>
      <h2 class="text-2xl text-gray-600">List</h2>
    </div>

    <!-- Edit Product Form -->
    <div id="editForm" class="mb-8 p-4 border bg-white rounded-lg shadow-md hidden">
      <h3 class="text-2xl mb-4">Edit Product</h3>
      <form>
        <div class="mb-4">
          <label class="block">Name</label>
          <input type="text" id="editName" class="border p-2 w-full">
        </div>
        <div class="mb-4">
          <label class="block">Price</label>
          <input type="number" id="editPrice" class="border p-2 w-full">
        </div>
        <div class="mb-4">
          <label class="block">Discounted Price</label>
          <input type="number" id="editDiscountedPrice" class="border p-2 w-full">
        </div>
        <div class="mb-4">
          <label class="block">Quantity</label>
          <input type="number" id="editQuantity" class="border p-2 w-full">
        </div>
        <div class="mb-4">
          <label class="block">Description</label>
          <textarea id="editDescription" class="border p-2 w-full"></textarea>
        </div>
        <div class="flex space-x-4">
          <button type="button" onclick="saveProduct()" class="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          <button type="button" onclick="cancelEdit()" class="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>

    <!-- Product Table -->
    <table class="table w-full text-left bg-white rounded-lg shadow-md mt-8">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-3">Product Id</th>
          <th class="p-3">Product Name</th>
          <th class="p-3">Price</th>
          <th class="p-3">Discounted Price</th>
          <th class="p-3">Quantity</th>
          <th class="p-3">Category</th>
          <th class="p-3">Actions</th>
        </tr>
      </thead>
      <tbody id="productTableBody">
      </tbody>
    </table>
  </div>

  <script src="../js/adminProducts.js">
    
  </script>
</body>
</html>
