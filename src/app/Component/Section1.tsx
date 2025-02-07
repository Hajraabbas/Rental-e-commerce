"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

const Section1 = () => {
  const [wishlist, setWishlist] = useState<string[]>([]); // Product IDs
  const [popularcars, setPopularCars] = useState<any[]>([]); // All car data
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state for data fetch

  // Fetch popular cars data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Query for popular cars from Sanity
        const query = `*[_type == "Popularcar"]`;
        const data = await client.fetch(query);
        setPopularCars(data); // Set the fetched data
      } catch (error) {
        console.error('Failed to fetch popular cars data:', error);
      } finally {
        setIsLoading(false); // Set loading to false once fetch is done
      }
    };

    fetchData();

    // Load wishlist from localStorage
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
  }, []); // Empty dependency array ensures this effect runs only once

  // Handle Add/Remove from Wishlist
  const toggleWishlist = (e: any, productId: string) => {
    e.preventDefault();
    setWishlist((prevWishlist) => {
      const updatedWishlist = prevWishlist.includes(productId)
        ? prevWishlist.filter((id) => id !== productId) // Remove
        : [...prevWishlist, productId]; // Add

      // Store the updated wishlist in localStorage
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  };

  // Show loading spinner until data is fetched
  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className='px-[40px] py-[32px] bg-[#F6F7F9]'>
      {/* div for popular car heading and view all link */}
      <div className='flex justify-between px-3 '>
        <div>
          <h1 className='font-semibold font-[PlusJakartaSans] text-[16px] text-[rgba(144,163,191,100%)]'>Popular Car</h1>
        </div>
        <div>
          <h1 className='font-semibold font-[PlusJakartaSans] text-[16px] text-[rgba(53,99,233,100%)]'>
            <Link href={"/category"}>View All</Link>
          </h1>
        </div>
      </div>

      {/* this is the div in which cars listing is present */}
      <div className='my-2 w-fit mx-auto sm:mx-0 sm:w-full justify-center gap-8 flex flex-col sm:flex-row sm:flex-wrap sm:justify-between'>
        {popularcars.length > 0 ? (
          popularcars.map((r: any, index: number) => (
            <Link key={index} href={`detailcars/popularcars/${r._id}`}>
              <div className='bg-white rounded-lg w-fit p-4 shrink-0'>
                <h1 className='font-semibold font-[PlusJakartaSans] text-[16px] text-[rgba(144,163,191,100%)]'>{r._type}</h1>
                {/* this is for car name and heart button */}
                <div className='flex justify-between items-center'>
                  <div>
                    <h1 className='font-bold text-[rgba(26,32,44,100%)] text-[16px]'>{r.name}</h1>
                  </div>
                  <div>
                    {/* wishlist addition */}
                    <button onClick={(e) => toggleWishlist(e, r._id)} // Pass car ID to toggleWishlist
                      className={`ml-4 text-3xl ${wishlist.includes(r._id) ? "text-red-500" : "text-gray-400"}`}> ♥
                    </button>
                  </div>
                </div>

                {/* div for car category heading */}
                <div>
                  <h1 className='text-[rgba(89,103,128,100%)] font-bold text-[14px]'>{r.type}</h1>
                </div>

                {/* div for car image */}
                <div className=' flex justify-center my-10'>
                  <Image src={urlFor(r.image).url()} alt='loading' width={200} height={200}></Image>
                </div>

                {/* div for specifications */}
                <div className='flex justify-between'>
                  <div className='flex gap-1 items-center'>
                    <Image src={"/assets/section1/fuel.png"} alt='loading' width={20} height={20}></Image>
                    <h1>{r.fuelCapacity}</h1>
                  </div>
                  <div className='flex gap-1 items-center'>
                    <Image src={"/assets/section1/Stering wheel.png"} alt='loading' width={20} height={20}></Image>
                    <h1>{r.transmission}</h1>
                  </div>
                  <div className='flex gap-1 items-center'>
                    <Image src={"/assets/section1/profile.png"} alt='loading' width={20} height={20}></Image>
                    <h1>{r.seatingCapacity}</h1>
                  </div>
                </div>

                {/* div for pricing and button */}
                <div className='flex justify-between items-center my-2'>
                  <div>
                    <h1 className='font-[PlusJakartaSans] font-bold text-[20px]'>
                      {r.pricePerDay}/<span className='text-[14px] text-[rgba(26,32,44,100%)]'>day</span>
                    </h1>
                  </div>
                  <Link href={`billing/popularcars/${r._id}`}>
                    <button className='bg-[#3563E9] text-white rounded-md px-6 py-2'>Rent Now</button>
                  </Link>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No cars available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Section1;