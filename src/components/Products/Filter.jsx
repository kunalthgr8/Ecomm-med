import React from "react";

function Filter() {
  return (
    <>
      <div className="bg-nav-white rounded-xl mt-10 mr-3 border border-nav-color flex self-center flex-col justify-center">
        <div className="text-xl text-nav-color font-semibold p-4">
          <h1>Filter</h1>
          
        </div>
        <div className="p-4 pt-0 w-full">
          <h1 className="text-base text-black-heading font-medium ">Category :</h1>
          <div className="flex mt-2 gap-3 pl-2">
            <input type="checkbox"  />
            <label htmlFor="" className="text-sm">Gucci</label>
          </div>
          <div className="flex gap-3 pl-2">
            <input type="checkbox"  />
            <label htmlFor="" className="text-sm">Gucci</label>
          </div>
          <div className="flex gap-3 pl-2">
            <input type="checkbox"  />
            <label htmlFor="" className="text-sm">Gucci</label>
          </div>
        </div>
        <div className="p-4 pt-0 w-full">
          <h1 className="text-base text-black-heading font-medium ">Price :</h1>
          <div className="flex mt-2 gap-3 pl-2">
            <input type="checkbox"  />
            <label htmlFor="" className="text-sm">$1-$99</label>
          </div>
          <div className="flex gap-3 pl-2">
            <input type="checkbox"  />
            <label htmlFor="" className="text-sm">$100-$999</label>
          </div>
          <div className="flex gap-3 pl-2">
            <input type="checkbox"  />
            <label htmlFor="" className="text-sm">$1000+</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
