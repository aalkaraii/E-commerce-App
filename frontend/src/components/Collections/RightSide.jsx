import React from "react";
import Title from "../Title";
const RightSide = () => {
  return (
    <div className="flex-1">
      <div className="flex justify-between text-base sm:text-2xl mb-4">
        <Title text1={"All"} text2={"COLLECTIONS"}></Title>
        {/* product sort */}
        <select className="border border-gray-300 text-sm px-2">
          <option value="relevent">Sort by: Relevent</option>
          <option value="low-high">Sort by: low to high</option>
          <option value="high-low">Sort by: high to low</option>
        </select>
      </div>
      {/* map products */}
    </div>
  );
};

export default RightSide;
