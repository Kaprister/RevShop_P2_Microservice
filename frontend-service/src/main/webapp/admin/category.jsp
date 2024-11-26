<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Category</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.0.4/tailwind.min.css">
</head>

<body>
	<header><jsp:include page="../components/adminHeader.jsp"/></header>

   <div class="mx-auto max-w-screen-xl px-4 pt-8 mt-8 sm:py-12">
		<h1>Category List</h1>
        <!-- Add New Category Button -->
        <div class="flex justify-end mb-8">
            <button id="addCategoryBtn" class="flex items-center bg-green-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-700 transition duration-200">
                <span class="mr-2">+</span>
                Add Category
            </button>
        </div>

        <!-- Add Category Popup (hidden by default) -->
        <div id="addCategoryPopup" class="fixed inset-0 flex items-center justify-center z-50 hidden">
            <div class="absolute inset-0 bg-gray-500 opacity-50"></div>
            <div class="relative p-8 rounded-lg shadow-lg w-1/2 bg-white text-black">
                <button id="closeAddCategoryPopup" class="absolute top-0 right-0 mt-4 mr-4 text-xl">&times;</button>
                <div class="mb-4 text-lg">
                    <label class="block">Category Name</label>
                    <input id="newCategoryName" type="text" class="border p-2 w-full rounded-md" />
                </div>
                <div class="mb-4 text-lg">
                    <label class="block">Image URL</label>
                    <input id="newCategoryImage" type="text" class="border p-2 w-full rounded-md" />
                </div>
                <button id="addCategorySubmit" class="mt-4 bg-green-500 text-white px-4 py-2 rounded-md">Add Category</button>
            </div>
        </div>
        
        

        <!-- Category Table -->
        <table class="table w-full text-left bg-white rounded-lg shadow-md mt-8">
            <thead class="bg-gray-100">
                <tr>
                    <th class="p-3">Category ID</th>
                    <th class="p-3">Category Name</th>
                    <th class="p-3">Category Image</th>
                    <th class="p-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                    <tr>
                        <td class="p-3">${category.id}</td>
                        <td class="p-3">${category.name}</td>
                        <td class="p-3">
                            <img src="${category.imageName}" alt="${category.name}" class="w-16 h-16 object-cover rounded-md" />
                        </td>
                        <td class="p-3">
						    <!-- Edit Button -->
						    <button class="bg-yellow-500 text-white px-4 py-2 rounded-md" onclick="editCategory(${category.id}, '${category.name}', '${category.imageName}')">
						        Edit
						    </button>
						    
						    <!-- Delete Button -->
						    <button class="bg-red-500 text-white px-4 py-2 rounded-md" onclick="deleteCategory(${category.id})">
						        Delete
						    </button>
                        </td>
                    </tr>
               
            </tbody>
        </table>
    </div>

	<script src="../js/adminCategories.js"></script>
    
</body>

</html>
