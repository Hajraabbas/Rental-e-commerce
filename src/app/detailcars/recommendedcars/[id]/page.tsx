import { client } from "@/sanity/lib/client";
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

export default async function dynamicpage(props: any) {
  const { id } = props.params; // Extract the dynamic route parameter

  // Query to fetch all cars
  const query = `*[ _type == "RecommendedCar"]`; 
  const recommendedcars =  await client.fetch(query);


  // Find the specific car by ID
  const car = recommendedcars.find((car: any) => car._id === id);

  if (!car) {
    // Handle case when the car is not found
    return <div>Car not found!</div>;
  }

  return (
    <>
    
    <div className="bg-[#F6F7F9] mx-auto p-4">
      {/* details div */}
      <div className='md:flex md:justify-between gap-2'>

        <div className="md:w-[50%]">
          <div className="bg-[rgba(84,166,255,100%)]  h-[400px] sm:h-[350px] rounded-xl bg-[url('/BG.png')] bg-cover bg-center relative">
            <div className='p-6'>
              <h1 className='text-white font-semibold text-[20px] w-fit'>Sports car with best design and acceleration</h1>
              <p className='font-medium text-[14px] text-white md:w-64 mt-3'>Safety and comfort while driving a futuristic and elegant sport car</p>
              <Link href={`/billing/recommendedcars/${car._id}`}><button className='bg-[rgba(53,99,233,100%)] px-10 py-4 mt-5 text-white'>Rent Car</button></Link>
            </div>
            <div className='flex justify-center'>
                <Image src={urlFor(car.image).url()} alt='loading' width={320} height={200} className="w-[200px] sm:w-[230px] lg:w-[300px]"></Image>
            </div>
        </div>

            <div className='lg:flex items-center justify-between mt-2'>
              <div className="w-[200px] lg:w-[230px] flex mx-auto lg:mx-0 my-2 lg:my-0" >
            <Image src={urlFor(car.image).url()} alt='loading' width={250} height={200} className="bg-[rgba(84,166,255,100%)] h-full rounded-xl bg-[url('/BG.png')] bg-cover bg-center relative p-6 w-[200px] lg:w-[230px]"></Image>
            </div>
            <Image src={"/assets/details/View 2.png"} alt='loading' width={150} height={200} className="w-[150px] lg:w-[180px] flex mx-auto lg:mx-0 my-2 lg:my-0"></Image>
            <Image src={"/assets/details/View 3.png"} alt='loading' width={150} height={200} className="w-[150px] lg:w-[180px] flex mx-auto lg:mx-0 my-2 lg:my-0"></Image>
            </div>
        </div>


        <div className='mt-3 md:mt-0 md:w-[50%] p-4 bg-white flex flex-col justify-between rounded-md'>

          <div>
            <h1 className="uppercase font-extrabold text-4xl text-[rgba(26,32,44,100%)]">{car.name}</h1>
          </div>

          <div className="my-4">
            <h1 className="text-2xl text-[rgba(89,103,128,100%)]">{car.description}</h1>
          </div>

          <div className="lg:flex lg:justify-between gap-4">

            <div className="lg:w-[50%] flex justify-between">
              <h1 className="text-[rgba(144,163,191,100%)] text-2xl">Type</h1>
              <h1 className="text-[rgba(26,32,44,100%)] font-bold text-2xl">{car.type}</h1>
            </div>

            <div className="lg:w-[50%] flex justify-between">
              <h1 className="text-[rgba(144,163,191,100%)] text-2xl">Capacity</h1>
              <h1 className="text-[rgba(26,32,44,100%)] font-bold text-2xl">{car.seatingCapacity}</h1>
            </div>

          </div>

          <div className="lg:flex lg:justify-between gap-4">

            <div className="lg:w-[50%] flex justify-between">
              <h1 className="text-[rgba(144,163,191,100%)] text-2xl">Transmission</h1>
              <h1 className="text-[rgba(26,32,44,100%)] font-bold text-2xl">{car.transmission}</h1>
            </div>

            <div className="lg:w-[50%] flex justify-between">
              <h1 className="text-[rgba(144,163,191,100%)] text-2xl">Fuel</h1>
              <h1 className="text-[rgba(26,32,44,100%)] font-bold text-2xl">{car.fuelCapacity}</h1>
            </div>

          </div>

          <div className="flex justify-between items-center my-4 lg:my-0">
            <div className="flex items-center">
            <h1 className="text-[rgba(26,32,44,100%)] text-3xl font-bold">{car.pricePerDay}</h1>
            <h1 className="text-[rgba(144,163,191,100%)] text-xl">/day</h1>
            </div>
            <Link href={`/billing/recommendedcars/${car._id}`}><button className='bg-[#3563E9] text-white rounded-md px-6 py-2'>Rent Now</button></Link>
          </div>

        </div>

      </div>
    </div>

    </>
  );
}
