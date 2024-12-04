import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from '../components/common/Head';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);

  const itemsPerPage = 10;

  const getProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:8082/products");
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:8082/products/${productId}`);
      if (response.status === 204) {
        getProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditClick = (product) => {
    setIsEditing(true);
    setEditedProduct({ ...product });
  };

  const handleEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:8082/products/${editedProduct.id}`, editedProduct);
      if (response.status === 200) {
        getProducts();
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
    setIsEditing(false);
    setEditedProduct(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginate = (page) => setCurrentPage(page);

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl px-4 pt-8 mt-8 sm:py-12">
      <Head h1="Product" h2="List" />

      {isEditing ? (
        <div className="mb-8 p-4 border bg-white rounded-lg shadow-md">
          <h3 className="text-2xl mb-4">Edit Product</h3>
          <form>
            <div className="mb-4">
              <label className="block">Name</label>
              <input
                type="text"
                name="name"
                value={editedProduct.name}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block">Price</label>
              <input
                type="number"
                name="price"
                value={editedProduct.price}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block">Discounted Price</label>
              <input
                type="number"
                name="discountedPrice"
                value={editedProduct.discountedPrice}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={editedProduct.quantity}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block">Description</label>
              <textarea
                name="description"
                value={editedProduct.description}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <table className="table w-full text-left bg-white rounded-lg shadow-md mt-8">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Product Id</th>
                <th className="p-3">Product Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">Discounted Price</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Category</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product) => (
                <tr key={product.id} className="border-gray-200">
                  <td className="p-3">{product.id}</td>
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">₹{product.price}</td>
                  <td className="p-3">₹{product.discountedPrice}</td>
                  <td className="p-3">{product.quantity}</td>
                  <td className="p-3">{product.category.name}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="bg-myyellow hover:bg-cyan-500 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-myred hover:bg-purple-500 text-white px-4 py-2 rounded ml-4"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => paginate(page)}
                className={`px-4 py-2 rounded ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ProductList;
