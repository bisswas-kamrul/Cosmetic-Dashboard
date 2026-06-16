import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import axios from "axios";

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState(null);
  const [editPrice, setEditPrice] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStock, setEditStock] = useState("");
  const [attributes, setAttributes] = useState({
    color: "",
    size: "",
    ram: "",
  });

  // GET PRODUCTS
  const fetchProductList = async () => {
    try {
      const res = await axios.get(
        "https://cosmetic-backend-e6ia.onrender.com/ShowProduct",
      );

      setProductList(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProductList();
  }, []);

  // UPDATE PRODUCT
  const handleUpdate = async (id) => {
    try {
      const formData = new FormData();

      formData.append("name", editName);
      formData.append("description", editDescription);
      formData.append("price", editPrice);
      formData.append("stock", editStock);

      formData.append("attributes", JSON.stringify(attributes));

      // IMAGE OPTIONAL
      if (editImage) {
        formData.append("image", editImage);
      }

      const token = localStorage.getItem("token");

      await axios.put(
        `https://cosmetic-backend-e6ia.onrender.com/UpdateCreate/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setEditingId(null);

      fetchProductList();
    } catch (error) {
      console.error(error);
    }
  };

  // DELETE PRODUCT
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://cosmetic-backend-e6ia.onrender.com/DeleteProduct/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchProductList();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="p-6 bg-white text-black dark:bg-black dark:text-white">
        <Card>
          <CardHeader>
            <CardTitle>Product List</CardTitle>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>SL</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Color</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHeader>

              <TableBody>
                {productList.map((item, index) => (
                  <TableRow key={item._id}>
                    <TableCell>{index + 1}</TableCell>

                    {/* EDIT MODE */}
                    {editingId === item._id ? (
                      <>
                        {/* NAME */}
                        <TableCell>
                          <input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="border px-2 py-1 w-full rounded"
                          />
                        </TableCell>

                        {/* DESCRIPTION */}
                        <TableCell>
                          <input
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            className="border px-2 py-1 w-full rounded"
                          />
                        </TableCell>

                        {/* COLOR */}
                        <TableCell>
                          <select
                            value={attributes.color}
                            onChange={(e) =>
                              setAttributes({
                                ...attributes,
                                color: e.target.value,
                              })
                            }
                            className="border px-2 py-1 rounded">
                            <option value="">Select Color</option>

                            <option value="red">Red</option>

                            <option value="green">Green</option>

                            <option value="blue">Blue</option>

                            <option value="black">Black</option>

                            <option value="yellow">Yellow</option>

                            <option value="orange">Orange</option>

                            <option value="pink">Pink</option>
                          </select>
                        </TableCell>

                        {/* PRICE */}
                        <TableCell>
                          <input
                            value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                            className="border px-2 py-1 w-full rounded"
                          />
                        </TableCell>

                        {/* IMAGE */}
                        <TableCell>
                          <input
                            type="file"
                            name="image"
                            onChange={(e) => setEditImage(e.target.files[0])}
                          />
                        </TableCell>

                        <TableCell>
                          <input
                            type="number"
                            value={editStock}
                            onChange={(e) => setEditStock(e.target.value)}
                            className="border px-2 py-1 w-full rounded"
                          />
                        </TableCell>

                        {/* SAVE BUTTON */}
                        <TableCell>
                          <button
                            onClick={() => handleUpdate(item._id)}
                            className="px-3 py-1 bg-blue-600 text-white rounded cursor-pointer">
                            Save
                          </button>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        {/* NAME */}
                        <TableCell>{item.name}</TableCell>

                        {/* DESCRIPTION */}
                        <TableCell>{item.description}</TableCell>

                        {/* COLOR SHOW */}
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-7 h-7 rounded-full border shadow"
                              style={{
                                backgroundColor:
                                  typeof item.attributes === "string"
                                    ? JSON.parse(item.attributes).color
                                    : item.attributes?.color,
                              }}></div>

                            <span className="capitalize">
                              {typeof item.attributes === "string"
                                ? JSON.parse(item.attributes).color
                                : item.attributes?.color}
                            </span>
                          </div>
                        </TableCell>

                        {/* PRICE */}
                        <TableCell>${item.price}</TableCell>

                        {/* IMAGE */}
                        <TableCell>
                          <img
                            src={item.images?.[0]}
                            alt="product"
                            className="w-14 h-14 object-cover rounded"
                          />
                        </TableCell>
                        <TableCell>
                          {item.stock === 0 ? (
                            <span className="text-red-600 font-bold">
                              Out Of Stock
                            </span>
                          ) : item.stock <= 5 ? (
                            <span className="text-yellow-600 font-bold">
                              Only {item.stock} Left
                            </span>
                          ) : (
                            <span className="text-green-600 font-bold">
                              {item.stock} pcs
                            </span>
                          )}
                        </TableCell>
                        {/* ACTION */}
                        <TableCell className="space-x-2">
                          {/* EDIT BUTTON */}
                          <button
                            className="cursor-pointer bg-green-600 text-white px-3 py-1 rounded"
                            onClick={() => {
                              setEditingId(item._id);

                              setEditName(item.name);

                              setEditDescription(item.description);

                              setAttributes(
                                typeof item.attributes === "string"
                                  ? JSON.parse(item.attributes)
                                  : item.attributes || {
                                      color: "",
                                      size: "",
                                      ram: "",
                                    },
                              );

                              setEditPrice(item.price);
                              setEditStock(item.stock);
                            }}>
                            Edit
                          </button>

                          {/* DELETE BUTTON */}
                          <button
                            className="cursor-pointer bg-red-600 text-white px-3 py-1 rounded"
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

export default ProductList;
