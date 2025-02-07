import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Pickup from './Pickup';
import Dropoff from './Dropoff';

const Herosection =  () => {
   
  return (
    <>
    {/* parent div for hero section */}
    <div className='px-[40px] py-[32px] md:flex md:justify-between bg-[#F6F7F9]'>

        {/* first child div */}
        <div className="bg-[rgba(84,166,255,100%)] lg:w-[48%] h-[350px] rounded-xl bg-[url('/BG.png')] bg-cover bg-center relative">
            <div className='p-6'>
                <h1 className='text-white font-semibold text-[20px] w-fit'>The Best Platform For Car Rental</h1>
                <p className='font-medium text-[14px] text-white md:w-64 mt-3'>Ease of doing a car rental safely and reliably. Of course at a low price.</p>
                <Link href={"/category"}><button className='bg-[rgba(53,99,233,100%)] px-10 py-4 mt-5 text-white'>Rent Car</button></Link>
            </div>
            <div className='flex justify-center'>
                <Image src={"/assets/herosection/Hcar.png"} alt='loading' width={250} height={250}></Image>
            </div>
        </div>

         {/* second child div */}
        <div className="bg-[rgba(53,99,233,100%)] lg:w-[48%] h-[350px] rounded-xl bg-[url('/Rectangle.png')] bg-repeat bg-center relative hidden md:block">
            <div className='p-6'>
                <h1 className='text-white font-semibold text-[20px] w-fit'>Easy Way To Rent A Car At Low Price</h1>
                <p className='font-medium text-[14px] text-white md:w-64 mt-3'>Providing cheap car rental services and safe and comfortable facilities.</p>
                <Link href={"/category"}><button className='bg-[rgba(84,166,255,100%)] px-10 py-4 mt-5 text-white'>Rent Car</button></Link>
            </div>
            <div className='flex justify-center'>
                <Image src={"/assets/herosection/Hcar.png"} alt='loading' width={250} height={250}></Image>
            </div>
        </div>
    </div>

    {/* div for pickup and drop off */}
    <div className='px-[40px] py-[32px] flex flex-col lg:flex-row justify-between bg-[#F6F7F9]'>
        <Pickup />

        <div className='flex items-center justify-center'>
            <button className='bg-[rgba(53,99,233,100%)] w-fit h-fit p-3 rounded-md '><Image src={"/assets/herosection/Swap.png"} alt='loading' width={30} height={30}></Image></button>
        </div>

        <Dropoff />
    </div>
    </>
  )
}

export default Herosection