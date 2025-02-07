"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const Form = () => {

    const [isPickUp, setIsPickUp] = useState(false);

    const [isPaymentMethod, setIsPaymentMethod] = useState(false);
    
    const [isConfirm1, setIsConfirm1] = useState(false);
    
    const [isConfirm2, setIsConfirm2] = useState(false);


    const locations = [
        "Shahrah-e-Faisal",
        "Sindhi Muslim Society",
        "Nazimabad",
        "Garden",
        "Aga Khan Hospital",
        "FB Area",
        "Liaquatabad",
        "SITE Area",
        "Malir",
        "Landhi",
        "Saddar",
        "Gulshan-e-Iqbal",
        "Gulistan-e-Johar",
        "DHA",
        "Bahadurabad",
        "Tariq Road",
        "Liaquatabad"
    ];

    const { register , handleSubmit,  formState: {errors}, reset } = useForm();

    const CustomSubmit = async (d:any) => {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                access_key: "c0ce966f-eb26-485f-891d-1a3ad6c95e83",
                name: d.name,
                number: d.number,
                address : d.address,
                city : d.city,
                locaion : d.location,
                date : d.date,
                time : d.time
            }),
        });
        const result = await response.json();
        if (result.success) {
            alert('Thank you for submitting the form'); //  Show alert after successful form submission
            reset();
        }
        else {
            alert('Submission failed. Please try again.'); // Optional error handling
        }
    }

  return (
    <form onSubmit={handleSubmit(CustomSubmit)} className='order-2 lg:order-1'>

        <div className='w-full bg-white p-2 rounded-lg mt-3 lg:mt-0 mx-auto lg:mx-0'>

            <div>
                <h1 className='text-[rgba(26,32,44,100)] font-bold'>Confirm Booking</h1>
            </div>
            <div className='flex justify-between '>
                <h1 className='text-[rgba(144,163,191,100)] text-[14px]'>Please enter your billing info</h1>
                <h1 className='text-[rgba(144,163,191,100)] text-[14px]'>Step 1 to 4</h1>
            </div>

            <div className='my-3'>

                <div className='md:flex justify-between gap-3'>

                    <div className='md:w-[50%]'>
                        <h1 className='text-[rgba(26,32,44,100)] font-bold text-[16px]'>Name</h1>
                        <input {...register("name" , {required  : true} )} type="text" placeholder='Your Name' className='w-full p-3 bg-[#F6F7F9] rounded-lg mt-1'/>
                        {errors.name && errors.name.type == "required" && (
                            <h1 className='text-red-600 font-bold'>Name is required</h1>
                        ) }
                    </div>
                    <div className='mt-2 md:mt-0 md:w-[50%]'>
                        <h1 className='text-[rgba(26,32,44,100)] font-bold text-[16px]'>Phone Number</h1>
                        <input {...register("number" , {required  : true})}  type="number" placeholder='Phone Number' className='w-full p-3 bg-[#F6F7F9] rounded-lg mt-1' />
                        {errors.number && errors.number.type == "required" && (
                            <h1 className='text-red-600 font-bold'>Cell number is required</h1>
                        ) }
                    </div>

                </div>

                <div className='md:flex justify-between gap-3 mt-2'>

                    <div className='md:w-[50%]'>
                        <h1 className='text-[rgba(26,32,44,100)] font-bold text-[16px]'>Address</h1>
                        <input {...register("address" , {required  : true})}  type="text" placeholder='Address' className='w-full p-3 bg-[#F6F7F9] rounded-lg mt-1'/>
                        {errors.address && errors.address.type == "required" && (
                            <h1 className='text-red-600 font-bold'>Address is required</h1>
                        ) }
                    </div>
                    <div className='mt-2 md:mt-0  md:w-[50%]'>
                        <h1 className='text-[rgba(26,32,44,100)] font-bold text-[16px]'>Town/City</h1>
                        <input {...register("city" , {required  : true})}  type="text" placeholder='Town or City' className='w-full p-3 bg-[#F6F7F9] rounded-lg mt-1' />
                        {errors.city && errors.city.type == "required" && (
                            <h1 className='text-red-600 font-bold'>City is required</h1>
                        ) }
                    </div>

                </div>

            </div>

        </div>

        {/* rental info div */}
        <div className='w-full bg-white p-2 mt-2 rounded-lg mx-auto lg:mx-0'>

            <div>
                <h1 className='text-[rgba(26,32,44,100)] font-bold'>Rental Info</h1>
            </div>

            <div className='flex justify-between'>
                <h1 className='text-[rgba(144,163,191,100)] text-[14px]'>Please select your Rental Date</h1>
                <h1 className='text-[rgba(144,163,191,100)] text-[14px]'>Step 2 to 4</h1>
            </div>

            <div className='my-3'>

                <div>
                    <div className='flex gap-2'>
                        <input type="radio" checked={isPickUp}
                        onChange={() => setIsPickUp(!isPickUp)} />
                        <h1 className='font-[PlusJakartaSan] font-semibold text-[16px]'>Pick - Up</h1>
                    </div>

                    <div className={`md:flex justify-between gap-3 mt-2  ${isPickUp ? "opacity-100" : "opacity-50 pointer-events-none"}`}>
                        <div className='md:w-[50%]'>
                            <label className='text-[rgba(26,32,44,100)] font-bold text-[16px]' >Location</label>
                            <select disabled={!isPickUp} className='w-full p-3 bg-[#F6F7F9] rounded-lg mt-1'>
                                <option typeof='locaion' value="">Select your Location</option>
                                {locations.map((l:any, index:number)=>(
                                    <option key={index} value={l}>{l}</option>
                                ))}
                            </select>
                            
                        </div>
                    
                        <div className='mt-2 md:mt-0  md:w-[50%]'>
                            <h1 className='text-[rgba(26,32,44,100)] font-bold text-[16px]'>Date</h1>
                            <input {...register("date")} disabled={!isPickUp} type="date" className='w-full p-3 bg-[#F6F7F9] rounded-lg mt-1' />
                        </div>
                    </div>

                    <div className='mt-2'>
                        <div className='mt-2 md:mt-0 md:w-[50%]'>
                            <h1 className='text-[rgba(26,32,44,100)] font-bold text-[16px]'>Time</h1>
                            <input {...register("time")} disabled={!isPickUp} type="time" className='w-full p-3 bg-[#F6F7F9] rounded-lg mt-1' />
                        </div>
                    </div>
                </div>
                
            </div>

        </div>

        {/* Payment Method */}
        <div className='w-full  bg-white p-2 mt-2 rounded-lg mx-auto lg:mx-0'>

            <div>
                <h1 className='text-[rgba(26,32,44,100)] font-bold'>Payment Method</h1>
            </div>

            <div className='flex justify-between'>
                <h1 className='text-[rgba(144,163,191,100)] text-[14px]'>Please enter your payment method</h1>
                <h1 className='text-[rgba(144,163,191,100)] text-[14px]'>Step 3 to 4</h1>
            </div>

            <div className='my-3 rounded-lg bg-[#F6F7F9] p-3'>

                <div className='flex justify-between items-center ' >
                    <div className='flex gap-2'>
                        <input type="radio" checked={isPaymentMethod}
                        onChange={() => setIsPaymentMethod(!isPaymentMethod)} />
                        <h1 className='font-[PlusJakartaSan] font-semibold text-[16px]'>Credit Card</h1>
                    </div>
                </div>   
                
                <div className={`md:flex justify-between gap-3 mt-2 ${isPaymentMethod ? "opacity-100" : "opacity-50 pointer-events-none"}`}>

                    <div className='md:w-[50%]'>
                        <h1 className='text-[rgba(26,32,44,100)] font-bold text-[16px]' >Card Number</h1>
                        <input disabled={!isPaymentMethod} {...register("cardnumber" , {required  : true})}  type="text" placeholder='Card number' className='w-full p-3 bg-white rounded-lg mt-1'/>
                        {errors.cardnumber && errors.cardnumber.type == "required" && (
                            <h1 className='text-red-600 font-bold'>Card Number is required</h1>
                        ) }
                    </div>
                
                    <div className='mt-2 md:mt-0  md:w-[50%]'>
                        <h1 className='text-[rgba(26,32,44,100)] font-bold text-[16px]'>Expiration Date</h1>
                        <input disabled={!isPaymentMethod}  {...register("date" , {required  : true})}  type="date" className='w-full p-3 bg-white rounded-lg mt-1' />
                        {errors.date && errors.date.type == "required" && (
                            <h1 className='text-red-600 font-bold'>Expiry date is required</h1>
                        ) }
                    </div>

                </div>

                <div className='md:flex justify-between gap-3 mt-2'>
                    <div className='md:w-[50%]'>
                        <h1 className='text-[rgba(26,32,44,100)] font-bold text-[16px]'>Card Holder</h1>
                        <input disabled={!isPaymentMethod}  {...register("cardholder" , {required  : true})}  type="text" placeholder='Card holder' className='w-full p-3 bg-white rounded-lg mt-1' />
                        {errors.cardholder && errors.cardholder.type == "required" && (
                            <h1 className='text-red-600 font-bold'>Card Holder name is required</h1>
                        ) }
                    </div>
                    <div className='mt-2 md:mt-0  md:w-[50%]'>
                        <h1 className='text-[rgba(26,32,44,100)] font-bold text-[16px]'>CVC</h1>
                        <input disabled={!isPaymentMethod}  {...register("CVC" , {required  : true})}  type="number" placeholder='CVC' className='w-full p-3 bg-white rounded-lg mt-1' />
                        {errors.CVC && errors.CVC.type == "required" && (
                            <h1 className='text-red-600 font-bold'>CVC number is required</h1>
                        ) }
                    </div>
                </div>

            </div>

        </div>

        {/* Confirmation Method */}
        <div className='w-full bg-white p-2 mt-2 rounded-lg mx-auto lg:mx-0'>

            <div >
                <h1 className='text-[rgba(26,32,44,100)] font-bold'>Confirmation</h1>
            </div>

            <div className='flex justify-between'>
                <h1 className='text-[rgba(144,163,191,100)] text-[14px]'>We are getting to the end. Just few clicks and your rental is ready.</h1>
                <h1 className='text-[rgba(144,163,191,100)] text-[14px]'>Step 4 to 4</h1>
            </div>

            <div className='my-4'>
                <div className='flex gap-2 p-3 bg-[#F6F7F9] mt-2'>
                    <input type="checkbox" checked={isConfirm1}
                        onChange={() => setIsConfirm1(!isConfirm1)} />
                    <p className={`${isConfirm1 ? "opacity-100" : "opacity-50 pointer-events-none"}`}>I agree with sending an Marketing and newsletter emails. No spam, promised!</p>
                </div>
                <div className='flex gap-2 p-3 bg-[#F6F7F9] mt-2'>
                    <input type="checkbox" checked={isConfirm2}
                        onChange={() => setIsConfirm2(!isConfirm2)} />
                    <p className={`${isConfirm2 ? "opacity-100" : "opacity-50 pointer-events-none"}`}>I agree with our terms and conditions and privacy policy.</p>
                </div> 
            </div>

            <div className={`w-fit mt-4 ${!(isConfirm1 && isConfirm2)? "opacity-50 pointer-events-none" : ""}`}>
                <button disabled={!(isConfirm1 && isConfirm2)} type='submit' className='bg-[rgba(53,99,233,100%)] text-white px-6 py-3 rounded-lg'>Submit Form</button>
            </div>

            <div className='mt-3'>
                {/* <Image src={security} alt='loading' width={30} height={30} /> */}
                <h1 className='text-[rgba(26,32,44,100%)] text-[14px]'>All your data are safe</h1>
                <p className='text-[12px] text-[rgba(144,163,191,100%)]'>We are using the most advanced security to provide you the best experience ever.</p>
            </div>

        </div>

    </form>
  )
}

export default Form