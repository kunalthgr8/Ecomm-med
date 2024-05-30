import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../store/product/productSlice";

function Filter() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.product.filters);

  const handleCategoryChange = (category) => {
    const newCategories = filters.category.includes(category)
      ? filters.category.filter((c) => c !== category)
      : [...filters.category, category];

    dispatch(setFilters({ ...filters, category: newCategories }));
  };

  const handlePriceChange = (range) => {
    const rangeString = JSON.stringify(range);
    const newPrices = filters.price.some((p) => JSON.stringify(p) === rangeString)
      ? filters.price.filter((p) => JSON.stringify(p) !== rangeString)
      : [...filters.price, range];

    dispatch(setFilters({ ...filters, price: newPrices }));
  };

  return (
    <div className="bg-nav-white rounded-xl mt-10 mr-3 border border-nav-color flex self-center flex-col justify-center">
      <div className="text-xl text-nav-color font-semibold p-4">
        <h1>Filter</h1>
      </div>
      <div className="p-4 pt-0 w-full">
        <h1 className="text-base text-black-heading font-medium">Category :</h1>
        <div className="flex mt-2 gap-3 pl-2">
          <input
            type="checkbox"
            checked={filters.category.includes(`men's clothing`)}
            onChange={() => handleCategoryChange(`men's clothing`)}
          />
          <label className="text-sm">men's clothing</label>
        </div>
        <div className="flex mt-2 gap-3 pl-2">
          <input
            type="checkbox"
            checked={filters.category.includes("jewelery")}
            onChange={() => handleCategoryChange("jewelery")}
          />
          <label className="text-sm">jewelery</label>
        </div>
        <div className="flex mt-2 gap-3 pl-2">
          <input
            type="checkbox"
            checked={filters.category.includes("electronics")}
            onChange={() => handleCategoryChange("electronics")}
          />
          <label className="text-sm">electronics</label>
        </div>
        <div className="flex mt-2 gap-3 pl-2">
          <input
            type="checkbox"
            checked={filters.category.includes(`women's clothing`)}
            onChange={() => handleCategoryChange(`women's clothing`)}
          />
          <label className="text-sm">women's clothing</label>
        </div>
        {/* Add more categories as needed */}
      </div>
      <div className="p-4 pt-0 w-full">
        <h1 className="text-base text-black-heading font-medium">Price :</h1>
        <div className="flex mt-2 gap-3 pl-2">
          <input
            type="checkbox"
            checked={filters.price.some((p) => JSON.stringify(p) === JSON.stringify([1, 99]))}
            onChange={() => handlePriceChange([1, 99])}
          />
          <label className="text-sm">$1-$99</label>
        </div>
        <div className="flex gap-3 pl-2">
          <input
            type="checkbox"
            checked={filters.price.some((p) => JSON.stringify(p) === JSON.stringify([100, 999]))}
            onChange={() => handlePriceChange([100, 999])}
          />
          <label className="text-sm">$100-$999</label>
        </div>
        <div className="flex gap-3 pl-2">
          <input
            type="checkbox"
            checked={filters.price.some((p) => JSON.stringify(p) === JSON.stringify([1000, Infinity]))}
            onChange={() => handlePriceChange([1000, Infinity])}
          />
          <label className="text-sm">$1000+</label>
        </div>
      </div>
    </div>
  );
}

export default Filter;
