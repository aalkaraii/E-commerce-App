import React from "react";
import { RiExchangeDollarLine } from "react-icons/ri";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div>
        <RiExchangeDollarLine className="w-12 m-auto mb-5" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-400">We offer exchange Policy within 2 days</p>
      </div>
    </div>
  );
};

export default OurPolicy;
