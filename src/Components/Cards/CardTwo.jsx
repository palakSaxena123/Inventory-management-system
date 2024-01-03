import React from 'react';
import { useSelector } from 'react-redux';

const CardTwo = () => {
  const totalWeight = useSelector((state)=>state.product.totalWeight);
  return (
    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
    <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="w-6 h-6 text-white"
      >
        <path
          fillRule="evenodd"
          d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
          clipRule="evenodd"
        />
      </svg>
    </div>
    <div className="p-4 text-right">
      <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600 ">
     TOTAL WEIGHT
      </p>
      <h3 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
        {totalWeight} KG
      </h3>
    </div>
    <div className="border-t border-blue-gray-50 p-4">
      <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
        <strong className="text-green-500">+3%</strong>&nbsp;than last
        month
      </p>
    </div>
  </div>
 
  )
}

export default CardTwo;