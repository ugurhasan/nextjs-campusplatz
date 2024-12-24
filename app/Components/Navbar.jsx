"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import HomeImage from "./HomeImage";

export default function Navbar({ searchPlaceholder, showHomeImage = true }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/auth/check-login", {
          withCredentials: true, // Ensure cookies are sent
        });
  
        if (response.status === 200 && response.data.isLoggedIn) { // Corrected key
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
      }
    };
  
    checkLogin();
  }, []);
  

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md pb-[11px]">
        <div className="flex items-center justify-between w-full p-4 border-gray-300">
          <a href="/" className="text-3xl font-extrabold pl-8">CampusPlatz</a>

          <div className="flex items-center bg-gray-200 rounded-lg px-4 py-3 shadow-sm w-full max-w-5xl mx-auto">
            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#9c9c9c" viewBox="0 0 256 256">
              <path d="M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z"></path>
            </svg>
            <input
              className="flex-1 border-0 bg-transparent outline-none text-gray-700 placeholder-gray-500 font-outfit"
              type="search"
              placeholder={searchPlaceholder}
            />
          </div>

          <nav className="hidden md:flex gap-5 pr-8">
            {isLoggedIn ? (
              <>
                <a href="/profile" className="font-semibold bg-white hover:bg-gray-300 text-black px-4 py-3 rounded-sm">
                  Profile
                </a>
                <a href="/logout" className="font-semibold bg-white hover:bg-gray-300 text-black px-4 py-3 rounded-sm">
                  Logout
                </a>
              </>
            ) : (
              <>
                <a href="/login" className="font-semibold bg-white hover:bg-gray-300 text-black px-4 py-3 rounded-sm">
                  Login
                </a>
                <a href="/signup" className="font-semibold bg-white hover:bg-gray-300 text-black px-4 py-3 rounded-sm">
                  Sign up
                </a>
              </>
            )}
            <a href="/sell" className="font-semibold bg-blue-950 hover:bg-blue-900 text-white px-4 py-3 rounded-sm">
              Create New Listing
            </a>
          </nav>
        </div>
      </div>
      {showHomeImage && <HomeImage />}
    </>
  );
}
