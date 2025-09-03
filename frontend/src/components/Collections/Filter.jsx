import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext";

const Filter = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  return (
    <div className="min-w-60">
      <p
        // onClick={setShowFilter(true)}
        className="my-2 text-xl flex items-center cursor-pointer gap-2">
        FILTERS
      </p>
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
    </div>
  );
};

export default Filter;
