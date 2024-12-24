// components/ProductCard.js
export default function ProductCard({ product }) {
    return (
      <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold">{product.name}</h3>
          <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>
          <p className="text-gray-500 text-sm mt-2 truncate">{product.description}</p>
          <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            View Details
          </button>
        </div>
      </div>
    );
  }
  