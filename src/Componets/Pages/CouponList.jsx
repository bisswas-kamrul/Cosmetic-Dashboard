import React from "react";
import { useEffect, useState } from "react";
const CouponList = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH COUPONS
  const fetchCoupons = async () => {
    try {
      const res = await fetch(
        "https://cosmetic-backend-e6ia.onrender.com/Show-Coupon",
      );

      const data = await res.json();

      if (data.success) {
        setCoupons(data.coupons);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // LOADING
  if (loading) {
    return <div className="text-center py-10 text-xl">Loading...</div>;
  }

  // DELETE COUPON
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure delete this coupon?");

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `https://cosmetic-backend-e6ia.onrender.com/Delete-Coupon/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const data = await res.json();

      if (data.success) {
        alert("Coupon Deleted");

        // REMOVE UI
        setCoupons((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };
  return (
    <>
      <div className="max-w-6xl mx-auto p-5">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Coupon List</h2>

          <div className="bg-black text-white px-4 py-2 rounded-lg">
            Total : {coupons.length}
          </div>
        </div>

        {coupons.length === 0 ? (
          <div className="text-center text-gray-500">No Coupons Found</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {coupons.map((coupon) => (
              <div
                key={coupon._id}
                className="border rounded-2xl p-5 shadow hover:shadow-lg transition">
                {/* CODE */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-black">
                    {coupon.code}
                  </h3>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      coupon.active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                    {coupon.active ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* DISCOUNT */}
                <div className="space-y-2">
                  <p className="text-lg">
                    Discount :
                    <span className="font-bold text-green-600 ml-2">
                      {coupon.discountPercent}%
                    </span>
                  </p>

                  <p>
                    Minimum Purchase :
                    <span className="font-semibold ml-2">
                      ৳ {coupon.minPurchase}
                    </span>
                  </p>

                  <p>
                    Expire Date :
                    <span className="font-semibold ml-2">
                      {new Date(coupon.expireDate).toLocaleDateString()}
                    </span>
                  </p>
                </div>

                {/* FOOTER */}
                <div className="mt-5 border-t pt-3 text-sm text-gray-500">
                  Created : {new Date(coupon.createdAt).toLocaleDateString()}
                </div>
                <button
                  onClick={() => handleDelete(coupon._id)}
                  className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition cursor-pointer">
                  Delete Coupon
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CouponList;
