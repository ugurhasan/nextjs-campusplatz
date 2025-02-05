// components/PopularProducts.js
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const PopularProducts = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/marketplace');
        if (!response.ok) throw new Error('Failed to fetch popular products');
        const data = await response.json();
        if (data.popular_products && data.popular_products.length > 0) {
          setPopularProducts(data.popular_products);
        }
      } catch (error) {
        console.error('Error fetching popular products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularProducts();
  }, []);

  if (loading) {
    return <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="bg-gray-100 rounded-lg h-80"></div>
        ))}
      </div>
    </div>;
  }

  if (!popularProducts || popularProducts.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">Popular Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {popularProducts.map((product) => (
          <Link 
            href={`/product/${product._id}`} 
            key={product._id}
            className="bg-white border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
          >
            <div className="h-48 bg-gray-200">
              <img
                src={product.imageUrl || "/placeholder-image.jpg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1 truncate">
                {product.description}
              </p>
              <p className="text-xl font-bold text-gray-800 mt-2">
                €{product.price}
              </p>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {product.views || 0} views
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;