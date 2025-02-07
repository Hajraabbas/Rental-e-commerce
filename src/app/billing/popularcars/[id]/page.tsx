import { client } from "@/sanity/lib/client";
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Form from "@/app/Component/Form";

export default async function dynamicpage(props: any) {
  const { id } = props.params; // Extract the dynamic route parameter

  // Query to fetch all cars
  const query = `*[ _type == "Popularcar"]`;
  const popularcars = await client.fetch(query);

  // Find the specific car by ID
  const car = popularcars.find((car: any) => car._id === id);

  if (!car) {
    // Handle case when the car is not found
    return <div>Car not found!</div>;
  }

  return (
    
    <div className='bg-[#F6F7F9] p-4 lg:flex justify-between gap-4 '>

        {/* rental summary div */}

        <div className='bg-white lg:w-[50%] mx-auto lg:mx-0 p-4 rounded-lg h-fit order-1 lg:order-2'>
            <div>
                <h1 className='text-[rgba(26,32,44,100)] font-bold'>Rental Summary</h1>
                <p>Prices may change depending on the length of the rental and the price of your rental car</p>
            </div>

            <div className='flex justify-between mt-3'>
                <div className='flex gap-3'>
                    <div >
                        <Image src={urlFor(car.image).url()} alt='loading' width={400} height={200}></Image>
                    </div>
                    <div>
                        <h1 className='text-[rgba(26,32,44,100%)] font-bold text-[24px]'>{car.name}</h1>
                    </div>
                </div>
            </div>

            <hr  className='mt-2'/>

            <div className='flex justify-between mt-3'>
                <h1>Subtotal</h1>
                <h1 >{car.pricePerDay}</h1>
            </div>

            <div className='flex justify-between mt-3'>
                <h1>Tax</h1>
                <h1>$0</h1>
            </div>

            <div className='flex justify-between mt-3 items-end'>
                    <div>
                        <h1 className='text-[rgba(26,32,44,100%)] text-[18px] font-bold'>Total Rental Price</h1>
                        <p className='text-[rgba(144,163,191,100%)] text-[14px] '>Overall price and includes rental discount</p>
                    </div>
                    <div>
                        <h1 className='text-[rgba(26,32,44,100%)] font-bold text-[32px]'>{car.pricePerDay}</h1>
                    </div>
                </div>

        </div>

        {/* rental summary div ends */}

        {/* billing info div */}
        <Form />
        {/* billing info div ends */}

    </div>

  )
}
