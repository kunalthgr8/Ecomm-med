import React from "react";
import { Billing, CartCard } from "../index";
import { useSelector } from "react-redux";
import EmptyCart from "../../assets/empty.svg";

function Cart() {
  const cart = useSelector((state) => state.cart);

  return (
    <div className="flex flex-col items-center w-full">
      {cart.length === 0 ? (
        <div className="flex flex-col items-center w-5/6 mt-10 h-full justify-center self-center">
          <img src={EmptyCart} alt="Your Cart is Empty" width="300px" />
          <h1 className="text-xl text-black-heading font-bold tracking-widest m-3">
            Start shopping now!
          </h1>
        </div>
      ) : (
        <div className="flex flex-row w-full mt-10">
          <div className="w-2/3 p-4 flex flex-col items-center">
            <h1 className="text-lg text-black-heading font-bold tracking-wider m-3 w-5/6">
              Order Summary
            </h1>
            {cart.map((item, index) => (
              <CartCard key={item.id} product={item.product} qty={item.qty} />
            ))}
          </div>
          <div className="flex flex-col pt-4 w-1/3">
            <Billing />
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
