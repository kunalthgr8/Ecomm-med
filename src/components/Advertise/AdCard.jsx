import React from "react";
import Family from "../../assets/Family.svg";
import { Link, NavLink } from "react-router-dom";

const AdCard = ({ num }) => {
  return (
    <div className="flex justify-evenly items-center m-2 ml-0 bg-teal-800 text-white font-poppins w-full rounded-2xl shadow-lg border-2 border-text-green transition-transform duration-300 ease-in-out bg-ad-color">
      <div className="flex flex-col w-1/4 sm:w-1/5 justify-start">
        <p className="text-xs font-semibold m-2 text-nav-white lg:text-sm">
          #For First order only
        </p>
        <h1 className="text-green-600 text-base sm:text-lg md:text-2xl font-bold m-2 text-text-green">
          Mega Welcome Deal
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center gap-4 m-2 sm:m-5">
        <div className="bg-gray-300 p-2 text-gray-800 rounded-2xl flex justify-center items-center flex-col transition-transform duration-300 ease-in-out bg-nav-active">
          <h1 className=" text-lg sm:text-xl md:text-3xl  font-extrabold text-center w-4/5 text-nav-color">
            Flat 25% off on Aoushadhi
          </h1>
        </div>
        <div className="bg-green-600 p-2 rounded-lg text-xs lg:text-sm cursor-pointer shadow-lg transition-transform duration-300 ease-in-out hover:scale-110 bg-text-green text-nav-white">
          <NavLink to="/offers">See More Offers {num}</NavLink>
        </div>
      </div>
      <div className="flex justify-center items-center w-1/4 sm:w-1/5">
        <img src={Family} alt="Advertisment" className="w-full" />
      </div>
    </div>
  );
};

export default AdCard;
