"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const images = [
  { src: "/hero-1.jpg", text: "Buy and Sell with Ease", button1: "Explore", button2: "List an Item", description: "Discover amazing deals on pre-loved items, or sell what you no longer need." },
  { src: "/hero-2.jpg", text: "Hassle-Free Housing for Students", button1: "Explore", button2: "List room", description: "Discover amazing deals on pre-loved items, or sell what you no longer need." },
  { src: "/hero-3.jpg", text: "Find or Become a Tutor", button1: "Explore", button2: "Offer tutorship", description: "Discover amazing deals on pre-loved items, or sell what you no longer need." },
  { src: "/hero-4.jpg", text: "Find flexible Job Opportunities", button1: "Explore", button2: "Post a Job", description: "Discover amazing deals on pre-loved items, or sell what you no longer need." },
];

// Static Site Generation (SSG)
export async function generateStaticParams() {
  return images.map((_, index) => ({ index: index.toString() }));
}

const HomeImage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative h-[88vh] mt-[82px]">
      {images.map((image, index) => (
        <div  key={index}  className={`absolute inset-0 transition-opacity duration-500  ${index === currentIndex ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>

            <Image  src={image.src}  alt={image.text}  fill  className="w-full h-[88vh] object-cover" quality={100} priority unoptimized={true}/>

          <div className="absolute px-[3rem] py-[4rem] bg-gray-950 bg-opacity-70 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold">
            <h1 className="text-center text-5xl">{image.text}</h1>
            <p className="text-white text-xl mb-8 max-w-2xl text-center font-extralight mt-5">{image.description}</p>
            <div className="flex flex-row gap-[10rem] justify-center">
              <Link href="/home" className="bg-blue-600 hover:bg-blue-300 transition px-5 py-3 rounded-sm font-bold">{image.button1}</Link>
              <Link href="/home" className="bg-blue-600 hover:bg-blue-300 transition px-5 py-3 rounded-sm font-bold">{image.button2}</Link>
            </div>
          </div>
        </div>
      ))}

    {/* Slide Navigation Buttons */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full transition-all 
              ${index === currentIndex ? "bg-white border-2 border-blue-500 scale-125" : "bg-white border-2 border-gray-400 hover:border-gray-500"}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeImage;
