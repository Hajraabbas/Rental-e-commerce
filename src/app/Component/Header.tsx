"use client"
import React , {useState} from 'react';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, SignedOut , SignInButton, UserButton} from '@clerk/nextjs';

const Header = () => {
    const words = [
      "popular cars",
      "recommended cars",
      "sedan",
      "suv",
      "hybrid",
      "electric",
      "gasoline",
      "hatchback",
      "sports"
    ];
  
    const [ActiveSearch, setActiveSearch] = useState<string[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    const router = useRouter(); // Initialize router
  
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchValue(value); // Update the input value
      if (value === "") {
        setActiveSearch([]);
        return;
      }
      setActiveSearch(words.filter((w) => w.includes(value)).slice(0, 8));
    };
  
    const handleSelect = (value: string) => {
      setSearchValue(value); // Update input field with the selected value
      setActiveSearch([]); // Hide the dropdown
    };

    const handleSearchButtonClick = (e:React.FormEvent) => {
      e.preventDefault();
      if (searchValue.trim()) {
        const isMatch = words.includes(searchValue.trim().toLowerCase()); // Check if searchValue exists in words array
        
        if (isMatch) {
          router.push(`/category?query=${searchValue}`);
        } else {
          router.push(`/not-found`); // Redirect to the not-found page
        }

        setSearchValue(""); // Clear input after search
        setActiveSearch([]); // Hide dropdown
      }
    };
  
    return (
      <div>
        {/* Main header */}
        <div className="flex justify-between items-center mx-[25px] my-[32px]">
          <div className="w-fit">
            <h1 className="text-[#3563E9] font-[PlusJakartaSans] font-bold text-[24px] uppercase">
              <Link href={"/"}>Morent</Link>
            </h1>
          </div>

          {/* Search bar */}
          <div className="hidden sm:block">
            <div className="relative">
              <div className="flex items-center px-3 py-1 gap-8 border border-[#C3D4E9] rounded-2xl">
                <Image
                  src={"/assets/header/search-normal.png"}
                  alt="loading"
                  width={20}
                  height={20}
                  className="cursor-pointer"
                  onClick={ (e) => handleSearchButtonClick (e)} // Add click handler to navigate
                />

                <input
                  value={searchValue} // Bind input value to state
                  onChange={handleSearch} // On change, handle search
                  type="text"
                  placeholder="Search here"
                  className="outline-none bg-transparent placeholder:text-[#596780]"
                />

                <Link href={"/category"}>
                  <Image
                    src={"/assets/header/filter.png"}
                    alt="loading"
                    width={25}
                    height={25}
                    className="cursor-pointer"
                  />
                </Link>
              </div>

              {/* Dropdown for search suggestions */}
              {ActiveSearch.length > 0 && (
                <div className="absolute w-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  {ActiveSearch.map((s, index) => (
                    <p
                      key={index}
                      onClick={() => handleSelect(s)} // On click, select the item
                      className="flex flex-col px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {s}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Other navigation links */}
          <div className="w-fit flex items-center gap-2">
            <Link href={"/mywishlist"}>
              <Image src={"/assets/header/heart.png"} alt="loading" width={35} height={35} />
            </Link>

            <div>
              <SignedOut>
                <SignInButton>
                  <div className="border-2 border-black flex items-center justify-center bg-white rounded-full p-1">
                    <Image
                      src={"/assets/header/Logo_image.png"}
                      alt="loading"
                      width={18}
                      height={18}
                      className="cursor-not-allowed"
                    />
                  </div>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className="border-2 border-black rounded-full flex items-center justify-center">
                  <UserButton />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="block sm:hidden px-[25px] ">
          <div className="flex shrink-0 items-center justify-center w-fit mx-auto border border-[#C3D4E9] rounded-xl">
            <Link href={"/category"}>
              <Image
                src={"/assets/header/filter.png"}
                alt="loading"
                width={35}
                height={25}
                className="cursor-pointer"
              />
            </Link>
          </div>

          <div className="relative w-full my-2">
            <div className="flex px-4 py-3 gap-6 drop-shadow-lg border border-[#C3D4E9] rounded-2xl">
              <Image
                src={"/assets/header/search-normal.png"}
                alt="loading"
                width={30}
                height={30}
                className="cursor-pointer"
                onClick={handleSearchButtonClick} // Add click handler to navigate
              />

              <input
                value={searchValue} // Bind input value to state
                onChange={handleSearch} // On change, handle search
                type="text"
                placeholder="Search here"
                className="flex outline-none bg-transparent placeholder:text-[#596780]"
              />
            </div>

            {/* Dropdown for search suggestions */}
            {ActiveSearch.length > 0 && (
              <div className="absolute w-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {ActiveSearch.map((s, index) => (
                  <p
                    key={index}
                    onClick={() => handleSelect(s)} // On click, select the item
                    className="flex flex-col px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {s}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default Header;