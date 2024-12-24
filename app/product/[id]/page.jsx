"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import Navbar from '../../Components/Navbar';
const searchPlaceholder = "Search marketplace...";

export default function ProductPage() {
  const { id } = useParams(); // Retrieve product ID
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/product/${id}`) // Replace with your backend's actual URL
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Error fetching product: ${res.status} ${res.statusText}`);
          }
          return res.json();
        })
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setProduct(data);
          }
        })
        .catch((err) => {
          console.error("Fetch Error:", err.message);
          setError("Failed to fetch product data.");
        });
    }
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
<>
  {/* Hero Section */}
  <Navbar searchPlaceholder="Search products..." showHomeImage={false} />

  {/* Product details container with increased top margin */}
  <div className="max-w-screen-lg mx-auto mt-[12rem] p-4">
    {/* Top section */}
    <div className="flex flex-col md:flex-row gap-6">
      {/* Left Side - Images */}
      <div className="flex flex-col items-center w-full md:w-1/2">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-auto rounded-lg border shadow-md"
        />
        <div className="flex gap-4 mt-4">
          {/* Additional images */}
          {product.additionalImages?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Product ${index + 1}`}
              className="w-16 h-16 object-cover border rounded-md shadow-sm cursor-pointer"
            />
          ))}
        </div>
      </div>

      {/* Right Side - Product Details */}
      <div className="w-full md:w-1/2">
        <p className="text-gray-500 text-sm">{product.category}</p>
        <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-600 mb-6">{product.description}</p>
        <p className="text-xl font-semibold text-gray-800">
          EUR {product.price.toFixed(2)}
        </p>
        <p className="text-gray-600 text-sm mb-2">Brand: {product.brand}</p>
        <p className="text-gray-600 text-sm mb-2">OS: {product.os}</p>
        <p className="text-gray-600 text-sm mb-2">RAM: {product.ram} GB</p>
        <p className="text-gray-600 text-sm mb-2">Screen Size: {product.screenSize}</p>
        <div className="flex items-center mt-6 gap-4">
          <button className="flex flex-row pl-3 pr-6 py-3 bg-black text-white font-medium rounded hover:bg-gray-800"> 
          <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#fbf3f3" viewBox="0 0 256 256"><path d="M132,24A100.11,100.11,0,0,0,32,124v84a16,16,0,0,0,16,16h84a100,100,0,0,0,0-200Zm0,184H48V124a84,84,0,1,1,84,84Zm12-80a12,12,0,1,1-12-12A12,12,0,0,1,144,128Zm-44,0a12,12,0,1,1-12-12A12,12,0,0,1,100,128Zm88,0a12,12,0,1,1-12-12A12,12,0,0,1,188,128Z"></path></svg>
            Talk to Seller
          </button>
          <button className="flex flex-row pl-3 pr-4 py-3 bg-gray-200 text-gray-700 font-medium rounded hover:bg-gray-300">
          <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#222020" viewBox="0 0 256 256"><path d="M232,102c0,66-104,122-104,122S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32A54,54,0,0,1,232,102Z" opacity="0.2"></path><path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z"></path></svg>
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>

    {/* Bottom Section - About Product */}
    <div className="mt-12 p-6 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-bold mb-4">About the Product</h2>
      <p className="text-gray-600">{product.about}</p>
    </div>
  </div>
</>

  );
}
