import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
const UserList = () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = () => {
    const token = localStorage.getItem("token");

    axios
      .get("https://cosmetic-backend-e6ia.onrender.com/User", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err.response?.data));
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://cosmetic-backend-e6ia.onrender.com/UserDelete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchUsers();
    } catch (error) {
      console.log(error.response?.data);
    }
  };
  return (
    <>
      <>
        <div className="p-5 dark:bg-black dark:text-white">
          <h2 className="text-xl mb-2">User List</h2>

          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">LastName</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="border p-2">{user._id}</td>
                  <td className="border p-2">{user.name}</td>
                  <td className="border p-2">{user.lastName}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    </>
  );
};

export default UserList;
