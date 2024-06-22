import React from "react";
import { Billing, CartCard, Button } from "../index";
import { useSelector } from "react-redux";
import EmptyCart from "../../assets/empty.svg";
import orderService from "../../appwrite/order";
import { useNavigate } from "react-router-dom";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const getOrders = () => {
    navigate("/orderHistory");
  };
  return (
    <div className="flex flex-col items-center w-full">
      <Button
        width="flex justify-center w-full sm:w-3/4 md:w-1/2"
        className="bg-button-color w-1/2 md:w-1/3 text-sm text-nav-white rounded-lg font-semibold transition-transform duration-400 hover:scale-110"
        onClick={getOrders}
      >
        {" "}
        See Order History
      </Button>
      {cart.length === 0 ? (
        <div className="flex flex-col items-center w-5/6 mt-10 h-full justify-center self-center">
          <img src={EmptyCart} alt="Your Cart is Empty" width="300px" />
          <h1 className="text-xl text-black-heading font-bold tracking-widest m-3">
            Start shopping now!
          </h1>
        </div>
      ) : (
        <div className="flex flex-col justify-center self-center lg:flex-row w-full mt-10">
          <div className=" w-full lg:w-2/3 p-4 flex flex-col items-center">
            <h1 className="text-lg text-black-heading font-bold tracking-wider m-3 w-5/6">
              Order Summary
            </h1>
            {cart.map((item, index) => (
              <CartCard
                key={item.id}
                product={item.product}
                productQty={item.product.stock}
                qty={item.qty}
              />
            ))}
          </div>
          <div className="flex flex-col pt-4 w-3/4 m-auto lg:w-1/3">
            <Billing />
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
