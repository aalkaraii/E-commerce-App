import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import { RiArrowDropDownLine } from "react-icons/ri";

const Filter = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  return (
    <div className="min-w-60">
      <div
        onClick={() => setShowFilter(!showFilter)}
        className="my-2 text-xl flex items-center cursor-pointer gap-2">
        FILTERS
        <RiArrowDropDownLine
          className={`h-10 w-9 transition-all ${
            showFilter ? "rotate-180" : ""
          }`}
        />
      </div>
      {/* catogery filter */}
      <div
        className={`border border-gray-300 pl-5 py-3 mt-6 ${
          showFilter ? "" : "hidden"
        }`}>
        <p className="mb-3 text-sm font-medium">CATEGORIES</p>
        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
          <p className="flex gap-2">
            <input type="checkbox" value={"men"} className="w-3" />
            Men
          </p>
          <p className="flex gap-2">
            <input type="checkbox" value={"women"} className="w-3" />
            Women
          </p>
          <p className="flex gap-2">
            <input type="checkbox" value={"kids"} className="w-3" />
            kids
          </p>
        </div>
      </div>
      {/* sub catogery filter */}

      <div
        className={`border border-gray-300 pl-5 py-3 my-5 ${
          showFilter ? "" : "hidden"
        }`}>
        <p className="mb-3 text-sm font-medium">TYPE</p>
        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
          <p className="flex gap-2">
            <input type="checkbox" value={"Topwear"} className="w-3" />
            Top wear
          </p>
          <p className="flex gap-2">
            <input type="checkbox" value={"bottomWear"} className="w-3" />
            bottom wear
          </p>
          <p className="flex gap-2">
            <input type="checkbox" value={"kids"} className="w-3" />
            winter wear
          </p>
        </div>
      </div>
    </div>
  );
};

export default Filter;
