// app/page.jsx
import styles from "./homeimage.module.css";

// Array of categories
const categories = [
  { name: "Dorm", imageClass: styles.slide },
  { name: "Clothes", imageClass: styles.slide2 },
  { name: "Electronics", imageClass: styles.slide3 },
  { name: "School", imageClass: styles.slide4 }, // Always for the left side
];

// Server Component
export default function Marketplace() {
  // Logic for left and right sections
  const leftCategory = categories.find((category) => category.name === "School");
  const rightCategories = categories.filter((category) => category.name !== "School");

  return (
    <div className="flex flex-row mt-[93px]">
      {/* Left Section */}
      <div
        className={`w-[50%] h-[50vh] ${leftCategory.imageClass} flex items-center justify-center`}
      >
        <div className="text-center">
          <h1 className="text-6xl font-extrabold mb-4 text-white">
            {leftCategory.name}
          </h1>
          <button className="bg-white text-black font-semibold py-3 px-9 hover:bg-gray-300 transition">
            Shop Now
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-[50%] flex flex-col">
        {rightCategories.map((category, index) => (
          <div
            key={index}
            className={`h-[16.6vh] ${category.imageClass} flex items-center justify-center`}
          >
            <div className="text-center">
              <h1 className="text-3xl font-extrabold mb-2 text-white">
                {category.name}
              </h1>
              <button className="bg-white text-black font-semibold py-2 px-6 hover:bg-gray-300 transition">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
