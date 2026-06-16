import axios from "axios";
import React, { useEffect, useState } from "react";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editTotal, setEditTotal] = useState("");
  const [editfinalTotal, setEditfinalTotal] = useState("");
  const [status, setStatus] = useState("pending");
  const [isPaid, setIsPaid] = useState(false);
  const [email, setemail] = useState("");

  // LOAD ORDERS
  useEffect(() => {
    getAllData();
  }, []);
  // GET ALL ORDERS
  const getAllData = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://cosmetic-backend-e6ia.onrender.com/AllOdearShow",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setOrders(res.data.orders || []);
    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  // DELETE ORDER
  const deleteOrder = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://cosmetic-backend-e6ia.onrender.com/deleteOrder/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Order Deleted");

      setOrders(orders.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT ORDER
  const editOrder = (item) => {
    setEditingId(item._id);
    setEditName(item.name);
    setEditPhone(item.phone);
    setEditAddress(item.address);
    setEditTotal(item.totalAmount);
    setEditfinalTotal(item.finalTotal);
    setStatus(item.status || "pending");
    setIsPaid(Boolean(item.isPaid)); //  FIX
    setemail(item.email);
  };

  // UPDATE ORDER
  const updateOrder = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `https://cosmetic-backend-e6ia.onrender.com/UpdeteProductorder/${id}`,
        {
          name: editName,
          phone: editPhone,
          address: editAddress,
          totalAmount: editTotal,
          finalTotal: editfinalTotal,
          isPaid: Boolean(isPaid),
          status: status,
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Order Updated");

      setEditingId(null);

      getAllData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5 bg-white text-black dark:bg-black dark:text-white">
      <h1 className="text-2xl font-bold mb-5">Admin Orders Dashboard</h1>

      <div className="grid gap-4">
        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          orders.map((item, index) => (
            <div key={item._id || index} className="border p-4 rounded shadow">
              <h2 className="font-bold">Order ID: {item._id}</h2>

              {editingId === item._id ? (
                <>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border p-2 w-full mb-2"
                    placeholder="Name"
                  />

                  <input
                    type="text"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="border p-2 w-full mb-2"
                    placeholder="Phone"
                  />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    className="border p-2 w-full mb-2"
                    placeholder="email"
                  />

                  <textarea
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    className="border p-2 w-full mb-2"
                    placeholder="Address"
                  />

                  <input
                    type="number"
                    value={editTotal}
                    onChange={(e) => setEditTotal(e.target.value)}
                    className="border p-2 w-full mb-2"
                    placeholder="Total Amount"
                  />
                  <input
                    type="number"
                    value={editfinalTotal}
                    onChange={(e) => setEditfinalTotal(e.target.value)}
                    className="border p-2 w-full mb-2"
                    placeholder="Total Amount"
                  />

                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border p-2 w-full mb-2">
                    <option value="pending">Pending</option>

                    <option value="processing">Processing</option>

                    <option value="shipped">Shipped</option>

                    <option value="delivered">Delivered</option>
                  </select>

                  <select
                    value={isPaid}
                    onChange={(e) => setIsPaid(e.target.value === "true")}
                    className="border p-2 w-full mb-2">
                    <option value="false">Unpaid</option>
                    <option value="true">Paid</option>
                  </select>
                </>
              ) : (
                <>
                  <p>Name: {item.name}</p>
                  <p>Phone: {item.phone}</p>
                  <p>email: {item.email}</p>
                  <p>Address: {item.address}</p>
                  <p>Status: {item.status}</p>

                  {/*  FIX HERE */}
                  <p>isPaid: {item.isPaid ? "Paid" : "Unpaid"}</p>
                </>
              )}

              <div className="mt-4 flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                <span className="font-semibold text-lg"> Total Amount</span>

                <span className="text-2xl font-bold text-green-600">
                  ৳ {item.totalAmount}
                </span>
              </div>
              <div className="mt-4 flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                <span className="font-semibold text-lg">
                  Discount FinalTotal Amount
                </span>

                <span className="text-2xl font-bold text-green-600">
                  ৳ {item.finalTotal}
                </span>
              </div>

              <p className="text-sm text-gray-600">
                Payment: {item.paymentMethod}
              </p>

              <hr className="my-2" />

              <h3 className="font-semibold mt-3">Products:</h3>

              {Array.isArray(item.items) &&
                item.items.map((prod, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 ml-2 border-b py-3">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-24 h-24 object-cover rounded-xl border shadow"
                    />

                    <div className="text-sm flex-1">
                      <p className="font-semibold text-lg">{prod.name}</p>

                      <p className="text-gray-500">Quantity: {prod.quantity}</p>

                      <p className="text-gray-500">
                        Size: {prod.size || "N/A"}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <div
                          className="h-4 w-4 rounded-full border"
                          style={{
                            backgroundColor: prod.color,
                          }}></div>

                        <span className="capitalize">{prod.color}</span>
                      </div>
                    </div>
                  </div>
                ))}

              {/* BUTTONS */}
              <div className="flex gap-3 mt-4">
                {editingId === item._id ? (
                  <button
                    onClick={() => updateOrder(item._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded">
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => editOrder(item)}
                    className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                    Edit
                  </button>
                )}

                <button
                  onClick={() => deleteOrder(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersList;
