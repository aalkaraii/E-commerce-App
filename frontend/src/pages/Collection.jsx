import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { RiArrowDropDownLine } from "react-icons/ri";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();
    console.log("category length", category.length);
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.category)
      );
    }
    setFilterProducts(productsCopy);
    console.log("products copy", productsCopy);
  };
  console.log(category);
  console.log(subCategory);

  console.log("filter products", filterProducts);

  // useEffect(() => {
  //   setFilterProducts(products);
  // }, []);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
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
              <input
                type="checkbox"
                value={"men"}
                onChange={toggleCategory}
                className="w-3"
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"women"}
                onChange={toggleCategory}
                className="w-3"
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"kids"}
                onChange={toggleCategory}
                className="w-3"
              />
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
              <input
                type="checkbox"
                onChange={toggleSubCategory}
                value={"Topwear"}
                className="w-3"
              />
              Top wear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                onChange={toggleSubCategory}
                value={"bottomWear"}
                className="w-3"
              />
              bottom wear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                onChange={toggleSubCategory}
                value={"kids"}
                className="w-3"
              />
              winter wear
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"All"} text2={"COLLECTIONS"}></Title>
          {/* product sort */}
          <select className="border-2 border-gray-300 text-sm px-2">
            <option value="relevent">Sort by: Relevent</option>
            <option value="low-high">Sort by: low to high</option>
            <option value="high-low">Sort by: high to low</option>
          </select>
        </div>
        {/* map products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
