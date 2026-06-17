import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useState } from "react";
import axios from "axios";
const CategoryAdd = () => {
  const [category, setCategory] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !image) {
      toast.error("All fields required");
      return;
    }
    const formData = new FormData();
    formData.append("name", category);
    formData.append("description", categoryDescription);
    formData.append("image", image);
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://cosmetic-backend-e6ia.onrender.com/CategoryCreat",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Category Created Successfully");
      setCategory("");
      setCategoryDescription("");
      setImage(null);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="space-y-6 mt-2 ml-64 ">
        {/* Add Category Form */}
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Add Category</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Category Name"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <Textarea
                placeholder="Category Description"
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
              />
              <Input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <Button
                type="submit"
                className="mt-2 w-full bg-pink-800 cursor-pointer">
                Add
              </Button>
              <Toaster position="top-right" />
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CategoryAdd;
