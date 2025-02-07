"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const Page = () => {

    // types is a variable in which all the types of the cars are stored as a string
  const Types = ["Sport", "Sedan", "SUV", "Hatchback", "Gasoline", "Hybrid", "Electric", "Diesel"];

    // Categories is a variable in which all the Seating capacity of the cars are stored as a string
    const Categories = ["2 People", "4 People", "5 People", "6 People"];

    // these are the react hooks to handle the state by using useState:
    // this is the state to handle for popular cars
    const [popularCars, setPopularCars] = useState<any[]>([]);

    // this is the state to handle for recommended cars
    const [recommendedCars, setRecommendedCars] = useState<any[]>([]);

    // this is the state to handle for the type of the cars for filteration
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    // this is the state to handle for the categories by seating capacity of the cars for filteration
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    // this is an other react hook " useEffect " in which the data for popular and recommended cars, respectively are fetched from the Sanity Database

  useEffect(() => {

    // Creating of function named with fetchData which is async in which popular and recommended car data are fetched
    const fetchData = async () => {
      const query1 = `*[_type == "Popularcar"]`;
      const popularData = await client.fetch(query1);
      setPopularCars(popularData);

      const query2 = `*[_type == "RecommendedCar"]`;
      const recommendedData = await client.fetch(query2);
      setRecommendedCars(recommendedData);
    };
    // Invoking of the function:
    fetchData();
  }, []);

  //   this is the handle change function for types, if the user select any type from the list, the same type of data should be displayed in the category section

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  //   this is the handle change function for categories, if the user select any category from the list, the same type of data should be displayed in the category section
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  //   In this step, make a logic to filter the popularcars and store the data into filterpopularCars variable
  const filteredPopularCars = popularCars.filter(
    (car) =>
      (selectedTypes.length === 0 || selectedTypes.includes(car.type)) &&
      (selectedCategories.length === 0 || selectedCategories.includes(car.seatingCapacity))
  );

  //   In this step, make a logic to filter the recommendedcars and store the data into filterRecommendedCars variable
  const filteredRecommendedCars = recommendedCars.filter(
    (car) =>
      (selectedTypes.length === 0 || selectedTypes.includes(car.type)) &&
      (selectedCategories.length === 0 || selectedCategories.includes(car.seatingCapacity))
  );

//   this is the return div for the sidebar pannel and the main category div
  return (
    <div className="flex">
      {/* Sidebar  div*/}
      <div className="w-[20%] p-4 hidden md:block">
        {/* Type Filter */}
        <div>
          <h1 className="text-[rgba(144,163,191,100%)] text-[12px] font-semibold">TYPE</h1>
          <ul className="my-4 space-y-3">
            {Types.map((type, index) => (
              <li key={index} className="flex gap-3">
                <input type="checkbox" onChange={() => handleTypeChange(type)} />
                <h1 className="text-[rgba(89,103,128,100%)] font-semibold">{type}</h1>
              </li>
            ))}
          </ul>
        </div>

        {/* Capacity Filter */}
        <div className="mt-4">
          <h1 className="text-[rgba(144,163,191,100%)] text-[12px] font-semibold">Capacity</h1>
          <ul className="my-4 space-y-3">
            {Categories.map((category, index) => (
              <li key={index} className="flex gap-3">
                <input type="checkbox" onChange={() => handleCategoryChange(category)} />
                <h1 className="text-[rgba(89,103,128,100%)] font-semibold">{category}</h1>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Section - Category / Filtered Cars */}
      <div className="w-[80%] p-4 bg-[#F6F7F9] mx-auto">
        <div className="my-2 w-fit mx-auto sm:mx-0 sm:w-full justify-center gap-8 flex flex-col sm:flex-row sm:flex-wrap sm:justify-between">
          {filteredPopularCars.map((r, index) => (
            <CarCard key={index} car={r} type="popularcars" />
          ))}
        </div>
        <div className="my-2 w-fit mx-auto sm:mx-0 sm:w-full justify-center gap-8 flex flex-col sm:flex-row sm:flex-wrap sm:justify-between">
          {filteredRecommendedCars.map((r, index) => (
            <CarCard key={index} car={r} type="recommendedcars" />
          ))}
        </div>
      </div>
    </div>
  );
};

// this is the car card components that takes two arguments one is car and other is type with types any and string respectively: All the data which is rendering onto the browser stored in this section
const CarCard = ({ car, type }: { car: any; type: string }) => {
  return (

    <Link href={`detailcars/${type}/${car._id}`}>
      <div className="bg-white rounded-lg w-fit p-4">

        <h1 className="font-semibold text-[16px] text-[rgba(144,163,191,100%)]">{car._type}</h1>
        <div className="flex justify-between">
          <h1 className="font-bold text-[rgba(26,32,44,100%)] text-[16px]">{car.name}</h1>
        </div>
        <h1 className="text-[rgba(89,103,128,100%)] font-bold text-[14px]">{car.type}</h1>
        <div className="flex justify-center my-10">
          <Image src={urlFor(car.image).url()} alt="loading" width={200} height={200} />
        </div>
        <div className="flex justify-between">
          <div className="flex gap-1 items-center">
            <Image src={"/assets/section2/fuel.png"} alt="loading" width={20} height={20} />
            <h1>{car.fuelCapacity}</h1>
          </div>
          <div className="flex gap-1 items-center">
            <Image src={"/assets/section2/Stering wheel.png"} alt="loading" width={20} height={20} />
            <h1>{car.transmission}</h1>
          </div>
          <div className="flex gap-1 items-center">
            <Image src={"/assets/section2/profile.png"} alt="loading" width={20} height={20} />
            <h1>{car.seatingCapacity}</h1>
          </div>
        </div>
        <div className="flex justify-between items-center my-2">
          <h1 className="font-bold text-[20px]">
            {car.pricePerDay}
            <span className="text-[14px] text-[rgba(26,32,44,100%)]">/day</span>
          </h1>
          <Link href={`billing/${type}/${car._id}`}>
            <button className="bg-[#3563E9] text-white rounded-md px-6 py-2">Rent Now</button>
          </Link>
        </div>
      </div>
    </Link>

  );
};

export default Page;