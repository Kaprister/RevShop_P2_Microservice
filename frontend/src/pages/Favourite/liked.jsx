/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Head from "../../components/common/Head";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function Liked() {
  const {userInfo} = useSelector(state => state.auth);
  const [likedProducts, setLikedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const userId = userInfo.id

  const handleRemoveFromWishList = async (product) => {
    try {
      await axios.delete(`http://localhost:8086/wishlist/removeProduct/${userId}/${product.id}`);
      toast.success("Product removed successfully!");

      // Update both wishlist and likedProducts state by removing the removed product
      setWishlist((prevWishlist) => prevWishlist.filter((id) => id !== product.id));
      setLikedProducts((prevProducts) => prevProducts.filter((item) => item.id !== product.id));
    } catch (error) {
      toast.error("Failed to remove liked product");
      console.error("Error removing liked product:", error);
    }
  };

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const wishlistResponse = await axios.get(`http://localhost:8086/wishlist/user/${userId}`);
        setWishlist(wishlistResponse.data.productIds);
      } catch (error) {
        setError("Failed to fetch wishlist");
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [userId]);

  useEffect(() => {
    const fetchLikedProducts = async () => {
      if (wishlist.length === 0) {
        setLikedProducts([]);
        setLoading(false);
        return;
      }

      try {
        const productPromises = wishlist.map((productId) =>
          axios.get(`http://localhost:8082/products/${productId}`)
        );

        const productResponses = await Promise.all(productPromises);
        setLikedProducts(productResponses.map((response) => response.data));
      } catch (error) {
        setError("Failed to fetch liked products");
        console.error("Error fetching liked products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedProducts();
  }, [wishlist]);

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
      <Head h1="Your" h2="WishList" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {likedProducts.length === 0 ? (
          <p>No liked products found.</p>
        ) : (
          likedProducts.map((product) => (
            <div
              key={product.id}
              className="relative bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <div className="flex space-x-1">
                  <p className="text-xl font-bold text-gray-900 mt-2">₹{product.discountedPrice || product.price}</p>
                  <span className="bg-mygreen px-4 py-2 font-bold text-mywhite rounded-md">
                    {product.rating || "1"} ⭐
                  </span>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 border border-gray-300"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleRemoveFromWishList(product)}
                    className="mt-4 px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600 border border-gray-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Liked;
