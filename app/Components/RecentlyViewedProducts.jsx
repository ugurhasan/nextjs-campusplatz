"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function RecentlyViewedProducts({ allProducts }) {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    // Fetch recently viewed product IDs from localStorage
    const recentProductIds = JSON.parse(localStorage.getItem("recentProducts") || "[]");

    // Map IDs to product details
    const recent = recentProductIds
      .map((id) => allProducts.find((product) => product._id === id))
      .filter(Boolean); // Remove null/undefined if a product isn't found

    setRecentProducts(recent);
  }, [allProducts]);

  if (recentProducts.length === 0) {
    return null; // Render nothing if no recent products exist
  }

  return (
    <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-semibold mb-4">Recently Viewed Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {recentProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
          >
            <Link href={`/product/${product._id}`}>
              <div className="h-60 bg-gray-200">
                <img
                  src={product.imageUrl || "https://via.placeholder.com/150"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
            <div className="p-6">
              <Link href={`/product/${product._id}`}>
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {product.name}
                </h3>
              </Link>
              <p className="text-sm text-gray-500 truncate">{product.description}</p>
              <p className="text-xl font-bold text-gray-800 mt-4">${product.price}</p>
              <p className="text-sm text-gray-500 mt-2">
                Location: {product.location || "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
