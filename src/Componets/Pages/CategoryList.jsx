import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
const CategoryList = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState(null);
  const getdata = async () => {
    try {
      const res = await axios.get(
        "https://cosmetic-backend-e6ia.onrender.com/Show",
      );
      setCategoryList(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  // useEffect শুধু প্রথম load এর জন্য
  useEffect(() => {
    getdata();
  }, []);

  //  Edit Click
  const handleEditClick = (item) => {
    setEditingId(item._id);
    setEditName(item.name);
    setEditDescription(item.description);
  };
  // Update Function
  const handleUpdate = async (id) => {
    try {
      const formData = new FormData();
      formData.append("name", editName);
      formData.append("description", editDescription);

      if (editImage) {
        formData.append("image", editImage);
      }

      const token = localStorage.getItem("token");

      await axios.put(
        `https://cosmetic-backend-e6ia.onrender.com/Updete/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setEditingId(null);
      getdata();
    } catch (error) {
      console.error(error);
    }
  };
  // Delete Product
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `https://cosmetic-backend-e6ia.onrender.com/Delete/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      getdata();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="mt-10 bg-white text-black dark:bg-black dark:text-white">
        <Card>
          <CardHeader>
            <CardTitle>Category List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>SL</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoryList.map((item, index) => (
                  <TableRow key={item._id}>
                    {/* Serial Number */}
                    <TableCell>{index + 1}</TableCell>
                    {/* Edit Mode */}
                    {editingId === item._id ? (
                      <>
                        <>
                          <TableCell>
                            <input
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="border px-2 py-1"
                            />
                          </TableCell>

                          <TableCell>
                            <input
                              value={editDescription}
                              onChange={(e) =>
                                setEditDescription(e.target.value)
                              }
                              className="border px-2 py-1"
                            />
                          </TableCell>

                          <TableCell>
                            <img
                              src={item.images?.[0]}
                              alt="category"
                              className="w-12 h-12 object-cover rounded mb-2"
                            />

                            <input
                              type="file"
                              onChange={(e) => setEditImage(e.target.files[0])}
                            />
                          </TableCell>

                          <TableCell>
                            <button
                              onClick={() => handleUpdate(item._id)}
                              className="px-3 py-1 bg-blue-600 text-white rounded">
                              Save
                            </button>
                          </TableCell>
                        </>
                      </>
                    ) : (
                      <>
                        <TableCell>{item.name}</TableCell>

                        <TableCell>{item.description}</TableCell>

                        <TableCell>
                          <img
                            src={item.images?.[0]}
                            alt="category"
                            className="w-12 h-12 object-cover rounded"
                          />
                        </TableCell>

                        <TableCell className="flex gap-3">
                          <button
                            onClick={() => handleEditClick(item)}
                            className="px-3 py-1 bg-green-600 text-white rounded">
                            Edit
                          </button>
                          <button
                            variant="destructive"
                            className="px-3 py-1 bg-red-800 text-white rounded"
                            onClick={() => handleDelete(item._id)}>
                            Delete
                          </button>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CategoryList;
