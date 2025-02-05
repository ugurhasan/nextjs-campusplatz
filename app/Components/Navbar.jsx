"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import HomeImage from "./HomeImage";

export default function Navbar({ searchPlaceholder, showHomeImage = true }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleLogout = () => {
    signOut({ redirect: true, callbackUrl: "/home" });
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-[83px] z-50 bg-white shadow-md">
        <div className="flex items-center w-full p-4 border-gray-300 gap-[15rem]">
          <Link href="/home" className="text-blue-950 text-3xl font-[900] pl-8 mt-2 -tracking-wide">
              <Image src="/CampusPlatzLogo.svg" alt="Logo" width={250} height={250} className="cursor-pointer" /> 
            
          </Link>

          <nav className="hidden md:flex gap-[20rem]">
            {!isSearchOpen ? (
              <> 
              
                <div className="flex flex-row gap-8 mt-3">
                  <Link href="/home" className="flex font-semibold text-blue-500 hover:text-blue-300 duration-100 text-xl">HOME</Link>
                  <Link href="/home" className="flex font-semibold text-blue-950 hover:text-blue-600 duration-100 text-xl">MARKETPLACE</Link>
                  <Link href="/home" className="flex font-semibold text-blue-950 hover:text-blue-600 duration-100 text-xl">ACCOMMODATION</Link>
                  <Link href="/home" className="flex font-semibold text-blue-950 hover:text-blue-600 duration-100 text-xl">TUTORING</Link>
                  <Link href="/home" className="flex font-semibold text-blue-950 hover:text-blue-600 duration-100 text-xl">STUDENT JOBS</Link>
                </div>  
              </>
            ) : (
              <div className="absolute top-0 left-0 w-full h-[83px] bg-white z-50">
              <div className="flex items-center justify-between h-full px-8">
                <Link href="/home" className="mr-8 pl-4 mt-1 text-blue-950 text-3xl font-[900] -tracking-wide">
                  {/*<Image src="/CampusPlatzLogo.svg" alt="Logo" width={250} height={250} className="cursor-pointer" />*/}
                  CampusPlatz
                </Link>
                
                <div className="flex items-center flex-1">
                  <div className="flex items-center bg-gray-200 rounded-lg px-4 py-3 shadow-sm w-full max-w-5xl ml-28">
                    <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#9c9c9c" viewBox="0 0 256 256">
                      <path d="M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z"></path>
                    </svg>
                    <input
                      className="flex-1 border-0 bg-transparent outline-none text-gray-700 placeholder-gray-500 font-outfit"
                      type="search"
                      placeholder={searchPlaceholder}
                      autoFocus
                    />
                    <button onClick={() => setIsSearchOpen(false)} className="ml-2 p-1 hover:bg-gray-300 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#9c9c9c" viewBox="0 0 256 256">
                        <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/>
                      </svg>
                    </button>
                  </div>
                </div>
           
                {status === "authenticated" ? (
                  <Link href="/profile" className="ml-4 font-semibold bg-white hover:bg-gray-300 text-black px-4 py-3 rounded-sm flex items-center">
                    <div className="p-1 bg-gray-400 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#fafafa" viewBox="0 0 256 256">
                        <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                      </svg>
                    </div>
                  </Link>
                ) : (
                  <div className="flex mb-1 mr-2">
                    <Link href="/signup">
                      <div className="font-medium text-white bg-blue-950 hover:bg-white hover:text-black duration-200 px-4 py-3 mx-2 rounded-sm">Sign Up</div>
                    </Link>
                    <Link href="/login">
                      <div className="font-medium bg-white hover:bg-gray-300 duration-200 text-black px-4 py-3 mx-2 rounded-sm">Login</div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            )}

            <div className="flex flex-row">
              <div 
                className="mt-[3px] mr-3 bg-gray-200 p-2 rounded-full cursor-pointer"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#050505" viewBox="0 0 256 256">
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                </svg>
              </div>

              {status === "authenticated" ? (
                <>
                  <Link href="/profile" className="font-semibold bg-white hover:bg-gray-300 text-black px-4 py-3 rounded-sm flex items-center">
                    <div className="p-1 bg-gray-400 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#fafafa" viewBox="0 0 256 256">
                        <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                      </svg>
                    </div>
                  </Link>
                  {pathname === "/profile" && (
                    <button onClick={handleLogout} className="flex flex-row font-semibold bg-white hover:bg-gray-300 text-black px-4 py-3 rounded-sm">
                      <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#080808" viewBox="0 0 256 256">
                        <path d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z"></path>
                      </svg>
                      Logout
                    </button>
                  )}
                </>
              ) : (
                <>
                  <Link href="/signup">
                    <div className="font-medium text-white bg-blue-950 hover:bg-white hover:text-black duration-200 px-4 py-3 mx-2 rounded-sm">Sign Up</div>
                  </Link>
                  <Link href="/login">
                    <div className="font-medium bg-white hover:bg-gray-300 duration-200 text-black px-4 py-3 mx-2 rounded-sm">Login</div>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
      {showHomeImage && <HomeImage />}
    </>
  );
}