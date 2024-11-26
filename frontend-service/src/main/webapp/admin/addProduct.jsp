<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Product</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet">
<!--     <link href="../css/addProduct.css" rel="stylesheet">
 -->    <script src="../js/addProduct.js" defer></script> 
</head>
<body class="bg-gray-100">
<div class="container mx-auto p-6">
	<%-- 	<jsp:include page="../components/adminHeader.jsp"></jsp:include>
	 --%>    <h1 class="text-3xl font-semibold text-center my-6">Add Product</h1>
    <h2 class="text-xl text-center text-gray-600 mb-6">to Bucket</h2>

    <form id="productForm" class="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto bg-white p-6 rounded-lg shadow-md">
        <!-- Image Upload -->
        <div class="form-control">
            <label for="image_file" class="block text-gray-700 font-semibold mb-2">Image:</label>
            <input
                type="file"
                class="file-input file-input-bordered file-input-primary w-full max-w-xs border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
                id="image_file"
                name="image_file"
                accept="image/*"
                required
            />
        </div>

        <!-- Product Name -->
        <div class="form-control">
            <label for="name" class="block text-gray-700 font-semibold mb-2">Product Name:</label>
            <input
                type="text"
                id="name"
                name="name"
                required
                class="input input-bordered w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <!-- Description -->
        <div class="form-control md:col-span-2">
            <label for="description" class="block text-gray-700 font-semibold mb-2">Description:</label>
            <textarea
                id="description"
                name="description"
                required
                class="textarea textarea-bordered w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
        </div>

        <!-- SKU Code -->
        <div class="form-control">
            <label for="skuCode" class="block text-gray-700 font-semibold mb-2">Code:</label>
            <input
                type="text"
                id="skuCode"
                name="skuCode"
                required
                class="input input-bordered w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <!-- Price -->
        <div class="form-control">
            <label for="price" class="block text-gray-700 font-semibold mb-2">Price:</label>
            <input
                type="text"
                id="price"
                name="price"
                required
                class="input input-bordered w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <!-- Discounted Price -->
        <div class="form-control">
            <label for="discountedPrice" class="block text-gray-700 font-semibold mb-2">Discounted Price:</label>
            <input
                type="text"
                id="discountedPrice"
                name="discountedPrice"
                required
                class="input input-bordered w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <!-- Quantity -->
        <div class="form-control">
            <label for="quantity" class="block text-gray-700 font-semibold mb-2">Quantity:</label>
            <input
                type="number"
                id="quantity"
                name="quantity"
                required
                class="input input-bordered w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <!-- Category -->
        <div class="form-control">
            <label for="categoryId" class="block text-gray-700 font-semibold mb-2">Category:</label>
            <select
                id="categoryId"
                name="categoryId"
                required
                class="select select-bordered w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Select a category</option>
            </select>
        </div>

        <!-- Submit Button -->
        <div class="form-control md:col-span-2 text-center">
            <button type="submit" class="btn btn-primary w-full p-3 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none">
                Add Product
            </button>
        </div>
    </form>
</div>
</body>
</html>
