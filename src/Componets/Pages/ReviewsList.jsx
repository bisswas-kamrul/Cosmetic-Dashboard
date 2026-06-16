import axios from "axios";
import { useEffect, useState } from "react";

const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://cosmetic-backend-e6ia.onrender.com/reviews",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setReviews(res.data.data || []);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `https://cosmetic-backend-e6ia.onrender.com/reviews/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchReviews();
    } catch (error) {
      alert(error.response?.data?.message || "Review update failed");
    }
  };

  const deleteReview = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://cosmetic-backend-e6ia.onrender.com/reviews/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setReviews((items) => items.filter((item) => item._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || "Review delete failed");
    }
  };

  return (
    <div className="p-6 bg-white text-black dark:bg-black dark:text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-5">Reviews Management</h1>

      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews found</p>
      ) : (
        <div className="grid gap-4">
          {reviews.map((review) => (
            <div key={review._id} className="border rounded p-4 shadow-sm">
              <div className="flex flex-col md:flex-row md:justify-between gap-4">
                <div>
                  <h2 className="font-semibold">
                    {review.productId?.name || "Deleted product"}
                  </h2>
                  <p className="text-sm text-gray-600">
                    By {review.userName} • Rating {review.rating}/5
                  </p>
                  <p className="mt-2">{review.comment}</p>
                  <p className="mt-2 text-sm">Status: {review.status}</p>
                </div>

                <div className="flex gap-2 h-fit">
                  <button
                    onClick={() => updateStatus(review._id, "approved")}
                    className="px-3 py-2 bg-green-600 text-white rounded cursor-pointer">
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(review._id, "hidden")}
                    className="px-3 py-2 bg-yellow-600 text-white rounded cursor-pointer">
                    Hide
                  </button>
                  <button
                    onClick={() => deleteReview(review._id)}
                    className="px-3 py-2 bg-red-600 text-white rounded cursor-pointer">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsList;
