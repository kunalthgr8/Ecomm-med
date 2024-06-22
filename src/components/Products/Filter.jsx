import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../store/product/productSlice";
import productService from "../../appwrite/product";

function Filter() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.product.filters);
  const [filterOptions, setFilterOptions] = useState([]);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await productService.getAllCategories();
        setFilterOptions(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchAllCategories();
  }, []);

  const handleCategoryChange = (category) => {
    const newCategories = filters.category.includes(category)
      ? filters.category.filter((c) => c !== category)
      : [...filters.category, category];

    dispatch(setFilters({ ...filters, category: newCategories }));
  };

  const handlePriceChange = (range) => {
    const rangeString = JSON.stringify(range);
    const newPrices = filters.price.some(
      (p) => JSON.stringify(p) === rangeString
    )
      ? filters.price.filter((p) => JSON.stringify(p) !== rangeString)
      : [...filters.price, range];

    dispatch(setFilters({ ...filters, price: newPrices }));
  };

  return (
    <div className="bg-nav-white rounded-xl ml-10 sm:ml-0 mt-5 sm:mt-10 mr-3 border border-nav-color w-3/4 sm:w-full flex self-center flex-col justify-center">
      <div className="text-xl text-nav-color font-bold p-4 tracking-wider">
        <h1>Filter</h1>
      </div>
      <div className="flex flex-row sm:flex-col">
        <div className="p-4 pt-0 w-full ">
          <h1 className="text-base text-black-heading font-semibold tracking-wide">
            Category :
          </h1>
          {filterOptions.map((category) => (
            <div key={category} className="flex mt-2 gap-3 pl-2">
              <input
                type="checkbox"
                checked={filters.category.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              <label className="text-sm">{category}</label>
            </div>
          ))}
        </div>
        <div className="p-4 pt-0 w-full">
          <h1 className="text-base text-black-heading font-semibold tracking-wide">
            Price :
          </h1>
          {[
            [1, 99],
            [100, 999],
            [1000, Infinity],
          ].map((range) => {
            const rangeString = JSON.stringify(range);
            return (
              <div key={rangeString} className="flex mt-2 gap-3 pl-2">
                <input
                  type="checkbox"
                  checked={filters.price.some(
                    (p) => JSON.stringify(p) === rangeString
                  )}
                  onChange={() => handlePriceChange(range)}
                />
                <label className="text-sm">{`$${range[0]}-${
                  range[1] === Infinity ? "+" : range[1]
                }`}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Filter;
