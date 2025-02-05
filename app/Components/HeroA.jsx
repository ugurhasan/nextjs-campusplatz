import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "Course Tutorials", imageUrl: "/books.jpg", link: "/tutorials" },
  { name: "Accommodation", imageUrl: "/desk.jpg", link: "/" },
  { name: "Mini-Jobs", imageUrl: "/jobs.jpg", link: "/jobs" },
  { name: "Marketplace", imageUrl: "/electronics.jpg", link: "/marketplace" },
];

export default function Marketplace() {
  return (
    <>
      {/* Two Column Layout */}
      <div className="relative w-full h-[50vh] mt-[93px] flex">
        {/* Left Section */}
        <div className="w-1/2 flex flex-col">
          {categories.slice(0, 2).map((category, index) => (
            <Link key={index} href={category.link} className="relative w-full h-1/2 group">
              {/* Background Image */}
              <Image
                src={category.imageUrl}
                alt={category.name}
                fill
                className="object-cover brightness-50 group-hover:brightness-90 transition duration-300"
              />
              {/* Overlay & Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                <h1 className="text-4xl font-extrabold">{category.name}</h1>
                <div className="flex flex-row gap-5">
                <span className="mt-3 bg-white text-black font-semibold py-[6px] px-4 text-lg rounded-md hover:bg-gray-300 transition">
                  Explore Now
                </span>
                <span className="mt-3 bg-white text-black font-semibold py-[6px] px-4 text-lg rounded-md hover:bg-gray-300 transition">
                  Sell Now
                </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="w-1/2 flex flex-col">
          {categories.slice(2).map((category, index) => (
            <Link key={index} href={category.link} className="relative w-full h-1/2 group">
              {/* Background Image */}
              <Image
                src={category.imageUrl}
                alt={category.name}
                fill
                className="object-cover brightness-50 group-hover:brightness-90 transition duration-300"
              />
              {/* Overlay & Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                <h1 className="text-4xl font-extrabold">{category.name}</h1>
                <div className="flex flex-row gap-5">
                <span className="mt-3 bg-white text-black font-semibold py-[6px] px-4 text-lg rounded-md hover:bg-gray-300 transition">
                  Explore Now
                </span>
                <span className="mt-3 bg-white text-black font-semibold py-[6px] px-4 text-lg rounded-md hover:bg-gray-300 transition">
                  Sell Now
                </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Marketplace Info Section */}
      <div className="text-center h-52 flex flex-col justify-center items-center gap-6">
        <h1 className="text-4xl font-bold">Buy & Sell, Find Jobs, Offer Services – Your Campus Marketplace!</h1>
        <Link href="/home" className="mt-4">
          <span className="bg-blue-600 hover:bg-blue-300 transition px-14 py-2 text-2xl rounded-sm font-bold text-white">
            SELL NOW
          </span>
        </Link>
      </div>
    </>
  );
}
