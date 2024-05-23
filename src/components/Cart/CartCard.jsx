import React from "react";
import { Button } from "../index";
import { MdDeleteOutline } from "react-icons/md";

function CartCard() {
  return (
    <>
      <div className="bg-nav-white flex flex-row justify-center self-center rounded-xl m-3 p-4 border-2 border-nav-color w-5/6">
        <div className="flex justify-center self-center">
          <img
            className="rounded-xl w-[150px]"
            src="https://www.netmeds.com/images/product-v1/150x150/1123123/shelcal_500_tablet_40s_696975_0_0.jpg"
            alt="product"
          />
        </div>
        <div className="flex flex-col w-full pl-8">
          <div className="flex justify-between">
            <h1 className="font-semibold text-nav-color text-lg tracking-wide">
              Product Name
            </h1>
            <button className="text-xl">
              <MdDeleteOutline />
            </button>
          </div>
          <div>
            <p className="text-sm text-black-heading mt-4 w-4/5 font-medium">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut nemo
              illum voluptate. Sequi voluptatem
            </p>
          </div>
          <div className="flex flex-row justify-between mt-4">
            <p className="text-lg text-black-color font-semibold">$100</p>
            <div className="flex flex-row justify-center self-center bg-button-color text-nav-white font-semibold px-3 py-1 rounded-xl gap-2">
              <p className="text-2xl cursor-pointer">-</p>
              <p className="flex justify-center self-center">Qty: 1</p>
              <p className="text-2xl cursor-pointer">+</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartCard;
