
// get all categories
async function fetchCategories() {
    try {
        const response = await fetch('http://localhost:8082/categories'); // Adjust this URL if needed
        if (response.ok) {
            const categories = await response.json(); // Get the JSON response

            const tableBody = document.querySelector('table tbody');
            tableBody.innerHTML = ''; // Clear existing table rows

            categories.forEach(category => {
                const row = document.createElement('tr');

                // Category ID
                const idCell = document.createElement('td');
                idCell.className = 'p-3';
                idCell.textContent = category.id;
                row.appendChild(idCell);

                // Category Name
                const nameCell = document.createElement('td');
                nameCell.className = 'p-3';
                nameCell.textContent = category.name;
                row.appendChild(nameCell);

                // Category Image
                const imageCell = document.createElement('td');
                imageCell.className = 'p-3';
                const image = document.createElement('img');
                image.src = category.imageName; // Assuming imageName is the URL or path
                image.alt = category.name;
                image.className = 'w-16 h-16 object-cover rounded-md';
                imageCell.appendChild(image);
                row.appendChild(imageCell);

                // Actions (Edit and Delete Buttons)
                const actionCell = document.createElement('td');
                actionCell.className = 'p-3 flex space-x-2';

                // Edit Button
                const editButton = document.createElement('button');
                editButton.className = 'bg-yellow-500 text-white px-4 py-2 rounded-md';
                editButton.textContent = 'Edit';
                editButton.onclick = function () {
                    editCategory(category.id, category.name, category.imageName);
                };
                actionCell.appendChild(editButton);

                // Delete Button
                const deleteButton = document.createElement('button');
                deleteButton.className = 'bg-red-500 text-white px-4 py-2 rounded-md';
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = function () {
                    deleteCategory(category.id);
                };
                actionCell.appendChild(deleteButton);

                row.appendChild(actionCell);

                // Append the new row to the table body
                tableBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}


// add category
    // Fetch categories when the page loads
    window.onload = fetchCategories;

    // Function to handle editing a category
    function editCategory(id, name, image) {
        alert(`Edit Category - ID: ${id}, Name: ${name}, Image: ${image}`);
        // Add code here to open a modal and allow editing the category
    }
        document.getElementById('addCategoryBtn').addEventListener('click', function () {
            document.getElementById('addCategoryPopup').classList.remove('hidden');
        });

        document.getElementById('closeAddCategoryPopup').addEventListener('click', function () {
            document.getElementById('addCategoryPopup').classList.add('hidden');
        });

        document.getElementById('addCategorySubmit').addEventListener('click', async function () {
            const name = document.getElementById('newCategoryName').value;
            const image = document.getElementById('newCategoryImage').value;

            if (name && image) {
                try {
                    const response = await fetch('http://localhost:8087/categories', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name: name, imageName: image })
                    });
                    if (response.ok) {
                        alert("Category added successfully");
                        window.location.reload(); // Reload the page to reflect changes
                    }
                } catch (error) {
                    console.error("Error adding category:", error);
                }
            }
        });

        function editCategory(id, name, image) {
            alert(`Edit Category - ID: ${id}, Name: ${name}, Image: ${image}`);
            // Here you can add code to open a modal to edit the category
        }
        
        
// edit categories
function editCategory(id, name, image) {
    // Open a popup or modal for editing
    const popup = document.getElementById('addCategoryPopup');
    popup.classList.remove('hidden');

    // Prefill the form with existing values
    document.getElementById('newCategoryName').value = name;
    document.getElementById('newCategoryImage').value = image;

    // Change the Add button to Update
    const submitButton = document.getElementById('addCategorySubmit');
    submitButton.innerText = 'Update Category';

    // Update event listener to handle editing
    submitButton.onclick = async function () {
        const updatedName = document.getElementById('newCategoryName').value;
        const updatedImage = document.getElementById('newCategoryImage').value;

        try {
            const response = await fetch(`http://localhost:8087/categories/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: updatedName, imageName: updatedImage })
            });

            if (response.ok) {
                alert('Category updated successfully');
                window.location.reload();
            } else {
                alert('Failed to update category');
            }
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };
}



//delete categries
async function deleteCategory(id) {
    const confirmation = confirm('Are you sure you want to delete this category?');
    if (confirmation) {
        try {
            const response = await fetch(`http://localhost:8087/categories/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Category deleted successfully');
                window.location.reload();
            } else {
                alert('Failed to delete category');
            }
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    }
}

