// ProductReview.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';
import Head from '../../components/common/Head';

function ProductReview({ productId, userID }) {
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:8082/reviews/product/${productId}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleAddReview = async () => {
    if (!reviewText || !rating) {
      toast.error('Please enter a review and rating');
      return;
    }

    const newReview = {
      product: { id: productId },
      userId: userID,
      rating,
      reviewText,
    };

    try {
      const response = await axios.post('http://localhost:8082/reviews/add', newReview);
      if (response.status === 200) {
        toast.success('Review added successfully!');
        setReviewText('');
        setRating(0);
        fetchReviews();
      }
    } catch (error) {
      console.error('Failed to add review:', error);
      toast.error('Failed to add review.');
    }
  };

  return (
    <div className="my-8 max-w-full mx-auto px-6">
      <Head h1="Product Reviews" h2="" />

      {/* Review Form */}
      <div className="mb-8 mt-8 p-8 bg-gradient-to-r from-teal-300 to-cyan-300 shadow-lg rounded-xl text-white transition-all duration-300">
        <h3 className="text-2xl font-bold mb-6 text-white">Add Your Review</h3>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review..."
          className="w-full p-4 mb-4 bg-white bg-opacity-20 rounded-lg text-teal-800 placeholder-gray-200 border-none focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-300 resize-none"
          rows="4"
        />
        <div className="flex items-center mb-6">
          <label className="mr-4 text-lg font-semibold">Rating:</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={30}
                className={`cursor-pointer transition-all ${
                  (hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
                }`}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>
        <button
          onClick={handleAddReview}
          className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg"
        >
          Submit Review
        </button>
      </div>

      {/* Display Reviews */}
      <div className="border-t pt-8">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <motion.div
              key={index}
              className="mb-6 p-6 bg-gray-50 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <p className="text-lg text-gray-800 mb-2">{review.reviewText}</p>
              <div className="flex items-center text-yellow-500">
                <span>{'⭐'.repeat(review.rating)}</span>
                <span className="ml-2 text-gray-600">({review.rating}/5)</span>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-600 text-center">No reviews yet. Be the first to review this product!</p>
        )}
      </div>
    </div>
  );
}

export default ProductReview;
