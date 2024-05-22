import React from "react";
import { Button } from "../index";
function Card({num}) {
  return (
    <>
      <div className="bg-nav-white w-full h-full rounded-lg">
        <div className="flex justify-center self-center">
          <img
            className="rounded-xl w-2/3"
            src="https://www.netmeds.com/images/product-v1/150x150/1123123/shelcal_500_tablet_40s_696975_0_0.jpg"
            alt="product"
          />
        </div>
        <div className="flex flex-col m-2">
          <h3 className="text-nav-color font-bold tracking-wider">
            Product Name {num}
          </h3>
          <p className="text-black-heading text-sm mt-4 tracking-wide font-semibold">$100</p>
        </div>
        <div className="w-full flex justify-center self-center mb-3">
          <Button
            width="w-full flex justify-center self-center p-2 pb-1"
            className="bg-button-color w-full text-sm text-nav-white rounded-lg font-semibold transition duration-400 ease-out hover:ease-in transform hover:scale-110 "
          >
            ADD TO CART
          </Button>
        </div>
      </div>
    </>
  );
}

export default Card;
