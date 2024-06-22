import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

function AdminCard({ product: { _id, image, name, description, price, stock } }) {
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    navigate(`/adminproduct/${_id}`);
  }, [navigate, _id]);

  return (
    <div
      className="bg-nav-white flex flex-col sm:flex-row justify-center self-center rounded-xl m-3 p-2 md:p-4 border-2 border-nav-color w-5/6  cursor-pointer hover:shadow-xl transition duration-500 ease-in-out"
      onClick={handleNavigate}
    >
      <div className="flex justify-center self-center">
        <img
          className="rounded-xl w-[150px]"
          src={image}
          alt={name}
        />
      </div>
      <div className="flex flex-col w-full pl-8 mt-5 sm:mt-0">
        <div className="flex justify-between">
          <h1 className="font-semibold text-nav-color text-lg tracking-wide">
            {name}
          </h1>
        </div>
        <div>
          <p className="text-sm text-black-heading mt-4 w-full md:w-4/5 font-medium">
            {description.substring(0, 100)}
          </p>
        </div>
        <div className="flex flex-row justify-between mt-4">
          <p className="text-lg text-text-green font-semibold">
            ${price}
          </p>
        </div>
        {stock ===0 &&<div className="flex flex-row justify-between mt-4">
          <p className="text-sm text-logout-color font-semibold">
            "Out Of Stock"
          </p>
        </div>}
      </div>
    </div>
  );
}

export default AdminCard;
