import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Ensure axios is installed and imported

function Liked() {
  const [likedProducts, setLikedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikedProducts = async () => {
      try {
        // Replace this URL with your actual REST API endpoint in the future
        const response = await axios.get("YOUR_API_ENDPOINT/liked-products");
        // setLikedProducts(response.data || []);
        setLikedProducts(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        setError("Failed to fetch liked products");
        console.error("Error fetching liked products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedProducts();
  }, []);

  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    navigate("/home/shop/product", { state: product });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Liked Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {likedProducts.length === 0 ? (
          <p>No liked products found.</p>
        ) : (
          likedProducts.map((product) => (
            <div
              key={product.id}
              className="relative bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-600 mt-2">{product.desc}</p>
                <div className="flex space-x-1">
                  <p className="text-xl font-bold text-gray-900 mt-2">
                    ₹{product.price}
                  </p>{" "}
                  <span className="bg-mygreen px-4 py-2 font-bold text-mywhite rounded-md">
                    {product.rating} ⭐
                  </span>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 border border-gray-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Liked;
