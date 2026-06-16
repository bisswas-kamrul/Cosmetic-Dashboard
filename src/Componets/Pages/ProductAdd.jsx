import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
const ProductAdd = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [badge, setbadge] = useState("");
  const [attributes, setAttributes] = useState({
    color: "",
    size: "",
    ram: "",
  });
  const [image, setImage] = useState(null);

  const [stock, setStock] = useState("");

  const handleProduct = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Name, Category & SubCategory are required!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("badge", badge);
    formData.append("attributes", JSON.stringify(attributes));
    formData.append("image", image);
    formData.append("stock", stock);

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://cosmetic-backend-e6ia.onrender.com/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success("Product Created Successfully");

      setName("");
      setDescription("");
      setPrice("");
      setbadge("");
      setStock("");
      setAttributes({
        color: "",
        size: "",
        ram: "",
      });
      setImage(null);
    } catch (error) {
      console.error(error);
      toast.error("Product Create Failed ");
    }
  };

  return (
    <>
      <Card className="max-w-xl mt-5 ml-64 bg-white text-black dark:bg-black dark:text-white">
        <CardContent className="p-6 space-y-4">
          <Toaster position="top-right" />
          <h1 className="text-2xl font-bold">Add Product</h1>

          <Input
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Input
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            placeholder="badge"
            value={badge}
            onChange={(e) => setbadge(e.target.value)}
          />

          <Input
            placeholder="Color"
            value={attributes.color}
            onChange={(e) =>
              setAttributes({ ...attributes, color: e.target.value })
            }
          />
          <Input
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <Input
            type="file"
            name="image" //ADD THIS
            onChange={(e) => setImage(e.target.files[0])}
          />
          <Button
            className="w-full bg-pink-800 text-white cursor-pointer"
            onClick={handleProduct}>
            Add Product
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductAdd;
