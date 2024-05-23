import React from "react";
import { Billing, CartCard, PromoCode } from "../index";
function Cart() {
  return (
    <>
      <div className="flex flex-row w-full mt-10">
        <div className="w-2/3 p-4 flex flex-col justify-center self-center">
          <h1 className="text-lg text-black-heading font-bold tracking-wider pl-4 pr-4 m-3 w-5/6">Order Summary</h1>
          <CartCard />
          <CartCard />
          <CartCard />
        </div>
        <div className="flex flex-col pt-4 w-1/3">
          <div>
            <PromoCode />
          </div>
          <div>
            <Billing />
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
