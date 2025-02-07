import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    // this is the main footer in which all links are present
    <div>
        {/* this is the top footer div in which all links with title is present */}
        <div className='px-[25px] py-[32px] md:flex'>

            {/* div for title and paragraph */}
            <div className='md:w-[50%]'>
                <div className='w-fit'>
                    <h1 className='text-[#3563E9] font-[PlusJakartaSans] font-bold text-[24px] uppercase'><Link href={"/"}>Morent</Link></h1>
                </div>
                <div className='sm:w-[292px] mt-4 md:mt-2 text-[rgba(19,19,19,0.6)]'>
                    <p>Our vision is to provide convenience and help increase your sales business</p>
                </div>
            </div>

            {/* div for all links */}

            <div className='md:w-[50%] flex flex-wrap justify-between sm:justify-around mt-10 md:mt-0'>
                <div className='w-fit'>
                    <h1 className='font-semibold text-[20px]'>About</h1>
                    <ul className='font-medium text-[rgba(19,19,19,0.6)] mt-3 space-y-4'>
                        <li><Link href="#">How it works</Link></li>
                        <li><Link href="#">Featured</Link></li>
                        <li><Link href="#">Partnership</Link></li>
                        <li><Link href="#">Business Relation</Link></li>
                    </ul>
                 </div>
                <div className='w-fit'>
                    <h1 className='font-semibold text-[20px]'>Community</h1>
                    <ul className='font-medium text-[rgba(19,19,19,0.6)] mt-3 space-y-4'>
                        <li><Link href="#">Events</Link></li>
                        <li><Link href="#">Blogs</Link></li>
                        <li><Link href="#">Podcast</Link></li>
                        <li><Link href="#">Invite a friend</Link></li>
                    </ul>
                </div>
                <div className='w-fit mt-10 xm:mt-0'>
                    <h1 className='font-semibold text-[20px]'>Socials</h1>
                    <ul className='font-medium text-[rgba(19,19,19,0.6)] mt-3 space-y-4'>
                        <li><Link href="#">Discord</Link></li>
                        <li><Link href="#">Instagram</Link></li>
                        <li><Link href="#">Twitter</Link></li>
                        <li><Link href="#">Facebook</Link></li>
                    </ul>
                </div>
            </div>

        </div>

        {/* this is the horizontal line break */}
        <hr />

        {/* this div involves the info about copyright, terms and condition & privacy policies */}
        <div className='md:flex justify-between px-[25px] py-[32px] items-center'>
            <div className='flex justify-between md:gap-6 order-1 sm:order-2'>
                <div>
                    <h1><Link href="#">Privacy & Policy</Link></h1>
                </div>
                <div>
                    <h1><Link href="#">Terms & Conditions</Link></h1>
                </div>
            </div>

            <div className='flex items-center order-2 sm:order-1 mt-6 md:mt-0'>
                <Image src={"/assets/footer/copyright.png"} alt='loading' width={15} height={15}></Image>
                <h1>2022 Morent. All rights reserved</h1>
            </div>
            
        </div>
    </div>
  )
}

export default Footer