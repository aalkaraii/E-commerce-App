import React from "react";
import { RiExchangeDollarLine } from "react-icons/ri";
import { IoIosTime } from "react-icons/io";
import { ImHeadphones } from "react-icons/im";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div>
        <RiExchangeDollarLine className="w-20 h-20 m-auto mb-5" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-400">We offer exchange Policy </p>
      </div>
      <div>
        <IoIosTime className="w-20 h-20 m-auto mb-5" />
        <p className="font-semibold">7 Days Return Policy</p>
        <p className="text-gray-400">We provide 7 days free return policy</p>
      </div>
      <div>
        <ImHeadphones className="w-20 h-20 m-auto mb-5" />
        <p className="font-semibold">Best Custoner Support </p>
        <p className="text-gray-400">We provide 24/7 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;
