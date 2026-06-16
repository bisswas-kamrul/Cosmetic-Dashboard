import React, { useState } from "react";

const CreactCoupon = () => {
  const [formData, setFormData] = useState({
    code: "",
    discountPercent: "",
    expireDate: "",
    minPurchase: "",
  });
  const [loading, setLoading] = useState(false);
  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        "https://cosmetic-backend-e6ia.onrender.com/Creact-Coupon",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },

          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();

      if (data.success) {
        alert("Coupon Created Successfully");

        // RESET FORM
        setFormData({
          code: "",
          discountPercent: "",
          expireDate: "",
          minPurchase: "",
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="max-w-xl mx-auto p-5">
        <div className="border rounded-2xl shadow p-6">
          <h2 className="text-3xl font-bold mb-6 text-center">Create Coupon</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* COUPON CODE */}
            <div>
              <label className="block mb-2 font-medium">Coupon Code</label>

              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="SAVE20"
                className="w-full border rounded-lg p-3 outline-none"
                required
              />
            </div>

            {/* DISCOUNT */}
            <div>
              <label className="block mb-2 font-medium">Discount Percent</label>

              <input
                type="number"
                name="discountPercent"
                value={formData.discountPercent}
                onChange={handleChange}
                placeholder="20"
                className="w-full border rounded-lg p-3 outline-none"
                required
              />
            </div>

            {/* MIN PURCHASE */}
            <div>
              <label className="block mb-2 font-medium">Minimum Purchase</label>

              <input
                type="number"
                name="minPurchase"
                value={formData.minPurchase}
                onChange={handleChange}
                placeholder="500"
                className="w-full border rounded-lg p-3 outline-none"
              />
            </div>

            {/* EXPIRE DATE */}
            <div>
              <label className="block mb-2 font-medium">Expire Date</label>

              <input
                type="date"
                name="expireDate"
                value={formData.expireDate}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 outline-none"
                required
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-xl cursor-pointer hover:bg-gray-800 transition">
              {loading ? "Creating..." : "Create Coupon"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreactCoupon;
