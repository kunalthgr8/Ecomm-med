import React from "react";
import { Input } from "../index";
import { Link } from "react-router-dom";
function PromoCode() {
  return (
    <>
      <div className="bg-nav-white flex flex-col justify-center self-center rounded-xl m-3 p-4 border-2 border-nav-color ">
        <h1 className="text-base text-nav-color underline tracking-wider">
          <Link to="/offers">Promo Code</Link>
        </h1>
        <div className="flex flex-row justify-between mt-4">
          <Input
            type="text"
            className="w-2/3 h-12 text-sm border-2 border-nav-color rounded-none rounded-l-lg rounded-r-none px-4"
            placeholder="Enter Promo Code"
          ></Input>

          <button className="bg-button-color text-nav-white text-sm font-semibold px-4 py-2 rounded-r-lg">
            Apply
          </button>
        </div>
      </div>
    </>
  );
}

export default PromoCode;
