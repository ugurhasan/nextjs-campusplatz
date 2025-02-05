"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const slides = [
  [
    { name: "Course Tutorials", imageUrl: "/books.jpg", link: "/tutorials" },
    { name: "Accommodation", imageUrl: "/desk.jpg", link: "/" },
  ],
  [
    { name: "Mini-Jobs", imageUrl: "/jobs.jpg", link: "/jobs" },
    { name: "Electronics", imageUrl: "/electronics.jpg", link: "/electronics" },
  ],
];

export default function Marketplace() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (isHovered) return; // Stop auto-slide when hovered

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isHovered]);

  return (
    <>
      {/* Slider Section */}
      <div
        className="relative w-full h-[50vh] mt-[93px] flex overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Slides Wrapper */}
        <div
          className="flex transition-transform duration-700 ease-in-out w-full"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="flex min-w-full">
              {slide.map((category, idx) => (
                <div key={idx} className="relative w-1/2 h-full">
                  {/* Background Image */}
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    layout="fill"
                    objectFit="cover"
                    quality={90}
                    className="absolute z-[-1]"
                  />

                  {/* Overlay for readability */}
                  <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                  {/* Text & Button */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                    <h1 className="text-4xl font-extrabold mb-4">{category.name}</h1>
                    <Link
                      href={category.link}
                      className="bg-white text-black font-semibold py-3 px-8 text-lg hover:bg-gray-300 transition"
                    >
                      Explore Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Dot Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 rounded-full ${
                currentSlide === index ? "bg-white" : "bg-gray-500"
              } transition duration-300`}
            ></button>
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
