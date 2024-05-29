import React from "react";
import { Button } from "../index";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQty } from "../../store/cart/cartSlice";

function CartCard({ qty, product}) {
  
  const dispatch = useDispatch();
  
  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  }

  const handleIncrement = () => {
    dispatch(updateQty({ id: product.id, qty: qty + 1 }));
  }

  const handleDecrement = () => {
    if (qty > 1) {
      dispatch(updateQty({ id: product.id, qty: qty - 1 }));
    }else{
      handleRemove(product.id);
    }
  }

  return (
    <>
      <div className="bg-nav-white flex flex-row justify-center self-center rounded-xl m-3 p-4 border-2 border-nav-color w-5/6">
        <div className="flex justify-center self-center">
          <img
            className="rounded-xl w-[150px]"
            src={product.image}
            alt={product.title}
          />
        </div>
        <div className="flex flex-col w-full pl-8">
          <div className="flex justify-between">
            <h1 className="font-semibold text-nav-color text-lg tracking-wide">
              {product.title}
            </h1>
            <button className="text-xl" onClick={()=>handleRemove(product.id)}>
              <MdDeleteOutline />
            </button>
          </div>
          <div>
            <p className="text-sm text-black-heading mt-4 w-4/5 font-medium">
              {product.description.substring(0, 100)}
            </p>
          </div>
          <div className="flex flex-row justify-between mt-4">
            <p className="text-lg text-black-color font-semibold">
              {product.price * qty}
            </p>
            <div className="flex flex-row justify-center self-center bg-button-color text-nav-white font-semibold px-3 py-1 rounded-xl gap-2">
              <p className="text-2xl cursor-pointer" onClick={handleDecrement}>-</p>
              <p className="flex justify-center self-center">Qty: {qty}</p>
              <p className="text-2xl cursor-pointer" onClick={handleIncrement}>+</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartCard;
