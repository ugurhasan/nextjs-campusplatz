import React from "react";
import Link from "next/link";

import Navbar from "../Components/Navbar";
import styles from "./marketplace.module.css";
import MarketplaceText from "../Components/MarketplaceText";
import Cards from "../Components/HomeCards";

export default async function Marketplace() {
  let categories = ["Electronics", "Fashion", "Books", "Furniture", "Others"];
  let products = [];
  let cardsData = [
    { id: 1, title: "Courses", hoverClass: "hover:border-blue-400", styleClass: "card1" },
    { id: 2, title: "Mini jobs", hoverClass: "hover:border-green-400", styleClass: "card2" },
    { id: 3, title: "Accommodation", hoverClass: "hover:border-purple-400", styleClass: "card3" },
  ];

  try {
    // Fetch product data from Flask backend
    const response = await fetch("http://127.0.0.1:5000/marketplace", {
      cache: "no-store", // Ensures fresh data on every request
    });

    if (!response.ok) {
      throw new Error("Failed to fetch product data.");
    }

    const data = await response.json();
    products = data.products;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }

  // Categorize products
  const categorizeProducts = (category) =>
    products.filter((product) => product.category === category);

  const searchPlaceholder = "Search marketplace...";

  return (
    <>
      {/* Navbar and Hero Section */}
      <Navbar searchPlaceholder={searchPlaceholder} />
      <div className="text-center mt-8">
        <MarketplaceText />
        <button className="px-16 py-2 bg-pink-600 hover:bg-pink-700 transition text-white text-2xl font-bold mt-4">
          SELL NOW
        </button>
        <button className="px-16 py-2 ml-10 bg-pink-600 hover:bg-pink-700 transition text-white text-2xl font-bold mt-4">
          RENT NOW
        </button>
      </div>

      {/* Cards Section */}
      <div className="mt-16">
        <Cards cardsData={cardsData} />
      </div>

      {/* Main Marketplace Section */}
      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-6">Marketplace</h1>

        {/* Render Products by Category */}
        {categories.map((category) => {
          const categorizedProducts = categorizeProducts(category);

          return (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{category}</h2>
              {categorizedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {categorizedProducts.map((product) => (
                    <div
                      key={product._id}
                      className="bg-white border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
                    >
                      <Link href={`/product/${product._id}`}>
                        {/* Product Image */}
                        <div className="h-60 bg-gray-200">
                          <img
                            src={product.imageUrl || "https://via.placeholder.com/150"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>

                      {/* Product Details */}
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
              ) : (
                <p className="text-gray-500">No products in this category.</p>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
