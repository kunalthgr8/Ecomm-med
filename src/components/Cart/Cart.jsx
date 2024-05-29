import React from "react";
import { Billing, CartCard } from "../index";
import { useSelector} from "react-redux";


function Cart() {
  const cart = useSelector((state) => state.cart);
  return (
    <div className="flex flex-row w-full mt-10">
      <div className="w-2/3 p-4 flex flex-col items-center">
        <h1 className="text-lg text-black-heading font-bold tracking-wider m-3 w-5/6">
          Order Summary
        </h1>
        {cart.length === 0 ? (
          <div className="flex justify-center items-center w-5/6">
            <h1 className="text-lg text-black-heading font-bold tracking-wider m-3">
              Your cart is empty
            </h1>
          </div>
        ) : (
          cart.map((item,index) => (
            <CartCard key={item.id} product={item.product} qty={item.qty} />
          ))
        )}
      </div>
      <div className="flex flex-col pt-4 w-1/3">
        <div>
          <Billing />
        </div>
      </div>
    </div>
  );
}

export default Cart;
