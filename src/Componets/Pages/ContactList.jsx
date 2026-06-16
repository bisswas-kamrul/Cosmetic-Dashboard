import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import axios from "axios";
import React, { useEffect, useState } from "react";

const ContactList = () => {
  const [contact, setContact] = useState([]);

  // Get Contact Data
  const ContactGetData = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://cosmetic-backend-e6ia.onrender.com/contactGet",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setContact(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete Contact
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://cosmetic-backend-e6ia.onrender.com/contactDelete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // UI Update
      setContact(contact.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    ContactGetData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 dark:bg-black dark:text-white min-h-screen">
      <div className="max-w-6xl mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6">
        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black dark:text-white">
            Contact List
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            All contact messages are shown here
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-zinc-700">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100 dark:bg-zinc-800">
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {contact.map((item, index) => (
                <TableRow
                  key={item._id}
                  className="hover:bg-gray-50 dark:hover:bg-zinc-800 transition">
                  <TableCell>{index + 1}</TableCell>

                  <TableCell className="font-medium">{item.name}</TableCell>

                  <TableCell>{item.email}</TableCell>

                  <TableCell className="max-w-300px truncate">
                    {item.message}
                  </TableCell>

                  <TableCell>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition cursor-pointer">
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Empty State */}
        {contact.length === 0 && (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            No Contact Found
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactList;
