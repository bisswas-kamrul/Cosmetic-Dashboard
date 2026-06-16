import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchVendors = useCallback(async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://cosmetic-backend-e6ia.onrender.com/vendors",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setVendors(res.data.data || []);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to load vendors");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  const updateVendorStatus = async (id, status) => {
    try {
      await axios.put(
        `https://cosmetic-backend-e6ia.onrender.com/vendors/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchVendors();
    } catch (error) {
      alert(error.response?.data?.message || "Vendor update failed");
    }
  };

  return (
    <div className="p-6 bg-white text-black dark:bg-black dark:text-white">
      <h1 className="text-2xl font-bold mb-5">Vendor Management</h1>

      {loading ? (
        <p>Loading vendors...</p>
      ) : vendors.length === 0 ? (
        <p>No vendors found</p>
      ) : (
        <div className="grid gap-4">
          {vendors.map((vendor) => (
            <div key={vendor._id} className="border rounded p-4 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    {vendor.vendorProfile?.storeName || vendor.name}
                  </h2>
                  <p>
                    {vendor.name} {vendor.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{vendor.email}</p>
                  <p className="text-sm">
                    Phone: {vendor.vendorProfile?.phone || "N/A"}
                  </p>
                  <p className="text-sm">
                    Address: {vendor.vendorProfile?.address || "N/A"}
                  </p>
                  <p className="mt-2">
                    Status:{" "}
                    <span className="font-semibold">{vendor.status}</span>
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => updateVendorStatus(vendor._id, "active")}
                    className="px-3 py-2 bg-green-600 text-white rounded cursor-pointer">
                    Approve
                  </button>
                  <button
                    onClick={() => updateVendorStatus(vendor._id, "pending")}
                    className="px-3 py-2 bg-yellow-600 text-white rounded cursor-pointer">
                    Pending
                  </button>
                  <button
                    onClick={() => updateVendorStatus(vendor._id, "blocked")}
                    className="px-3 py-2 bg-red-600 text-white rounded cursor-pointer">
                    Block
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

export default VendorList;
