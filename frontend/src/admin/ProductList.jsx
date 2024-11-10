import { useState } from 'react';
import Head from '../components/common/Head';

function ProductList() {
  const [products, setProducts] = useState([
    {
      id: "1",
      name: "Product 1",
      price: 100,
      quantity: 10,
      description: "This is a sample product",
      rating: 4.5,
    },
    {
      id: "2",
      name: "Product 2",
      price: 200,
      quantity: 5,
      description: "This is another sample product",
      rating: 3.9,
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);

  const handleDelete = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setEditedProduct({ ...product });
  };

  const handleSave = () => {
    setProducts(products.map(product =>
      product.id === editedProduct.id ? editedProduct : product
    ));
    setIsEditing(false);
    setEditedProduct(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 pt-8 mt-8 sm:py-12">
      <Head h2="Product List" />

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
            <div className="mb-4">
              <label className="block">Rating</label>
              <input
                type="number"
                name="rating"
                value={editedProduct.rating}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleSave}
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
        <table className="table w-full text-left bg-white rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Product Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-gray-200">
                <td className="p-3">{product.name}</td>
                <td className="p-3">₹{product.price}</td>
                <td className="p-3">{product.quantity}</td>
                <td className="p-3">{product.rating}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded ml-4"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductList;
