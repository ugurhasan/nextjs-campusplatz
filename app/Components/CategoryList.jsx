// components/CategoryList.js
export default function CategoryList({ categories }) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Categories</h2>
        <ul className="list-disc list-inside ml-4">
          {categories.map((category, index) => (
            <li key={index} className="text-lg text-gray-700">
              <span className="font-bold">{category.name}</span>
              {category.subcategories && category.subcategories.length > 0 && (
                <ul className="list-inside ml-4">
                  {category.subcategories.map((subcategory, subIndex) => (
                    <li key={subIndex} className="text-sm text-gray-600">
                      {subcategory}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  