import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import axios from "axios";

const Collection = () => {
  const products = useSelector((state) => state.shop.products);
  const search = useSelector((state) => state.shop.search);
  const showSearch = useSelector((state) => state.shop.showSearch);
  const backendUrl = useSelector((state) => state.shop.backendUrl);

  const [showFilters, setShowFilters] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

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

  const fetchFilteredProducts = async () => {
    try {
      const params = new URLSearchParams();
      if (category.length > 0) {
        params.append("category", category.join(","));
      }
      if (subCategory.length > 0) {
        params.append("subCategory", subCategory.join(","));
      }
      if (sortType === "low-high" || sortType === "high-low") {
        params.append("sort", sortType);
      }

      const response = await axios.get(
        `${backendUrl}/api/product/list?${params.toString()}`
      );
      if (response.data.success) {
        let fetchedProducts = response.data.products;

        if (showSearch && search) {
          fetchedProducts = fetchedProducts.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
          );
        }

        setFilterProducts(fetchedProducts);
      }
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };

  useEffect(() => {
    fetchFilteredProducts();
  }, [category, subCategory, sortType, search, showSearch, products]);

  return (
    <div className="flex flex-col sm:flex-row sm:justify-around gap-1 sm:gap-10 pt-10 border-t">
      {/*Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilters(!showFilters)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2">
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilters ? "rotate-90" : " "}`}
            src={assets.dropdown_icon}
          />
        </p>
        {/*Category Filters  */}
        <div
          className={`border border-gray300 pl-5 py-3 mt-6 ${
            showFilters ? "" : "hidden"
          } sm:block`}>
          <p className="mb-3 texts-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Men"}
                onChange={toggleCategory}
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Women"}
                onChange={toggleCategory}
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"kids"}
                onChange={toggleCategory}
              />
              Kids
            </p>
          </div>
        </div>
        {/* Subcatagory Filters*/}
        <div
          className={`border border-gray300 pl-5 py-3 my-5 ${
            showFilters ? "" : "hidden"
          } sm:block`}>
          <p className="mb-3 texts-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Topwear"}
                onChange={toggleSubCategory}
              />
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
              />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Winterwear"}
                onChange={toggleSubCategory}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>
      {/*Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product Sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2">
            <option value="relevant">Sort by:Relavant</option>
            <option value="low-high">Sort by:Low to High</option>
            <option value="high-low">Sort by:High to Low</option>
          </select>
        </div>

        {/*Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
