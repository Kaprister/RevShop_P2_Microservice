document.addEventListener("DOMContentLoaded", () => {
    const productId = new URLSearchParams(window.location.search).get('productId');
    const userId = JSON.parse(localStorage.getItem("user")).userId;

    if (!productId || !userId) {
        console.error("Product ID or User ID is missing.");
        return; // If IDs are missing, don't proceed further
    }

    // Fetch reviews and then average rating
    fetchReviews(productId)
        .then(totalReviews => {
            // After fetching reviews, now fetch the average rating
            fetchAverageRating(productId, totalReviews);
        });

    // Handle review submission    
    document.getElementById("submit-review-btn").addEventListener("click", () => submitReview(productId, userId));
    
    // Handle review deletion
    document.getElementById("reviews-list").addEventListener("click", (e) => {
        if (e.target && e.target.classList.contains("delete-review-btn")) {
            const reviewId = e.target.dataset.reviewId;
            deleteReview(reviewId);
        }
    });

    // Handle star rating click
    document.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', function () {
            const rating = this.dataset.value;
            document.getElementById('review-rating').value = rating; // Store rating in hidden input
            updateStars(rating); // Update the visual stars
        });
    });
});

// Function to update the stars UI
function updateStars(rating) {
    document.querySelectorAll('.star').forEach(star => {
        if (star.dataset.value <= rating) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });
}

// Function to fetch and display the average rating
function fetchAverageRating(productId, total) {
    fetch(`http://localhost:8087/reviews/average-rating/${productId}`)
        .then(response => response.json())
        .then(data => {
            console.log(typeof(data));
            const averageRatingElement = document.getElementById("average-rating");
            averageRatingElement.textContent = `${data}/5 (${total})` || "No rating yet";
        })
        .catch(error => console.error("Error fetching average rating:", error));
}

// Function to fetch and display all reviews for the product
function fetchReviews(productId) {
    return fetch(`http://localhost:8087/reviews/product/${productId}`)
        .then(response => response.json())
        .then(data => {
            // Check if the response is an array
            if (Array.isArray(data)) {
                const reviewsList = document.getElementById("reviews-list");
                reviewsList.innerHTML = ''; // Clear the list before appending
                data.forEach(review => {
                    const reviewItem = document.createElement("li");
                    reviewItem.classList.add("review-item");
                    reviewItem.innerHTML = `
                        <div class="review-text">${review.reviewText}</div>
                        <div class="review-rating">Rating: ${review.rating} / 5</div>
                    `;
                    reviewsList.appendChild(reviewItem);
                });

                // Update review count
                document.getElementById("review-count").textContent = data.length;
                
                // Return total review count to use for average rating
                return data.length;
            } else {
                console.error("Expected an array of reviews, but got:", data);

				                document.getElementById("reviews-list").innerHTML = "<li>No reviews available.</li>";
                return 0; // Return 0 if there are no reviews
            }
        })
        .catch(error => {
            console.error("Error fetching reviews:", error);
            return 0; // Return 0 if fetch fails
        });
}

// Function to submit a new review
function submitReview(productId, userId) {
    const reviewText = document.getElementById("review-text").value;
    const reviewRating = document.getElementById("review-rating").value;

    if (!reviewText || !reviewRating) {
        alert("Please fill in both fields.");
        return;
    }

    const newReview = {
        product: {
            id: productId // Use dynamic productId
        },
        userId: userId, // Use dynamic userId
        reviewText: reviewText,
        rating: parseInt(reviewRating),
    };

    fetch("http://localhost:8087/reviews/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
    })
        .then(response => response.json())
        .then(data => {
            alert("Review added successfully!");
            fetchReviews(productId) // Refresh reviews
                .then(totalReviews => fetchAverageRating(productId, totalReviews)); // Update average rating
        })
        .catch(error => console.error("Error adding review:", error));
}

/*// Function to delete a review
function deleteReview(reviewId) {
    fetch(`http://localhost:8087/reviews/delete/${reviewId}`, {
        method: "DELETE",
    })
        .then(response => response.json())
        .then(() => {
            alert("Review deleted successfully!");
            fetchReviews(productId) // Refresh reviews
                .then(totalReviews => fetchAverageRating(productId, totalReviews)); // Update average rating
        })
        .catch(error => console.error("Error deleting review:", error));
}*/
