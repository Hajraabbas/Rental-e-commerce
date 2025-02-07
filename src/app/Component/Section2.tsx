"use client"
import React, {useState , useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

const Section2 = () => {

    const [wishlist, setWishlist] = useState<string[]>([]); // Product IDs
    const [recommendedcars, setRecommendedCars] = useState<any[]>([]); // All car data
    const [visibleCount, setVisibleCount] = useState(4); // Number of cars to show initially
    const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state for data fetch

    // RecommendedCar
    // Fetch popular cars data on component mount
      useEffect(() => {
        const fetchData = async () => {
          try {
            // Query for popular cars from Sanity
            const query = `*[_type == "RecommendedCar"]`;
            const data = await client.fetch(query);
            
            console.log('Fetched Data:', data); // Debugging line to check if data is fetched
            setRecommendedCars(data); // Set the fetched data
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
    }, []);

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

    // Show more cars when "Show More" is clicked
    const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 4); // Load 4 more cars
    };

  return (
    <div className='px-[40px] py-[32px] bg-[#F6F7F9]'>

        {/* div for popular car heading and view all link */}
        <div className='flex justify-between px-3'>
            <div>
                <h1 className='font-semibold font-[PlusJakartaSans] text-[16px] text-[rgba(144,163,191,100%)]'>Recommended Car</h1>
            </div>
            <div>
                <h1 className='font-semibold font-[PlusJakartaSans] text-[16px] text-[rgba(53,99,233,100%)]'><Link href={"/category"}>View All</Link></h1>
            </div>
        </div>

        {/* this is the div in which cars listing is present */}
        <div className='my-2 w-fit mx-auto sm:mx-0 sm:w-full justify-center gap-8 flex flex-col sm:flex-row sm:flex-wrap sm:justify-between'>
        {recommendedcars.length > 0 ? (
            recommendedcars.slice(0 , visibleCount).map((r:any , index:number)=>(

                <Link key={index}  href={`detailcars/recommendedcars/${r._id}`}>

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
                                className={`ml-4 text-3xl ${wishlist.includes(r._id) ? "text-red-500" : "text-gray-400"}`}>♥
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
                                <h1 className='font-[PlusJakartaSans] font-bold text-[20px]'>{r.pricePerDay}/<span className='text-[14px] text-[rgba(26,32,44,100%)]'>day</span></h1>
                            </div>
                            
                            <Link href={`billing/recommendedcars/${r._id}`}><button className='bg-[#3563E9] text-white rounded-md px-6 py-2'>Rent Now</button></Link>
                            
                        </div>
                        
                    </div>

                </Link>

            ))
        ) : (
            <p>No cars available at the moment.</p>
        )}
          
        </div>

        {/* Show More and Show Less buttons */}
        <div className="flex justify-center mt-4 gap-4">
            {visibleCount < recommendedcars.length && (
                <button 
                onClick={handleShowMore} 
                className="bg-[#3563E9] text-white rounded-md px-6 py-2"
                >
                Show More
                </button>
            )}
            
            {visibleCount >= recommendedcars.length && (
                <button 
                onClick={() => setVisibleCount(4)} 
                className="bg-gray-500 text-white rounded-md px-6 py-2"
                >
                Show Less
                </button>
            )}
        </div>

    </div>
)
}

export default Section2;