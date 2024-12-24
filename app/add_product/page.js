"use client";
import { useState } from "react";

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subcategory: "",
    stock: "",
    imageUrl: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/add_product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Product added successfully!");
        console.log("Product added:", result.product);
      } else {
        setMessage(result.message || "Failed to add product.");
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Add a Product</h1>
      {message && <p className="mb-4 text-red-500">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          className="w-full px-3 py-2 border rounded"
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full px-3 py-2 border rounded"
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="w-full px-3 py-2 border rounded"
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          className="w-full px-3 py-2 border rounded"
          onChange={handleChange}
        />
        <input
          type="text"
          name="subcategory"
          placeholder="Subcategory"
          className="w-full px-3 py-2 border rounded"
          onChange={handleChange}
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          className="w-full px-3 py-2 border rounded"
          onChange={handleChange}
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          className="w-full px-3 py-2 border rounded"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full px-3 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
