import React from "react";
import { Button } from "../index";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQty } from "../../store/cart/cartSlice";
import { useNavigate } from "react-router-dom";

function CartCard({ qty, product, productQty}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  }

  const handleIncrement = () => {
    if(qty > productQty-1) return alert("Product out of stock");
    if(qty > productQty-1){
      dispatch(updateQty({ id: product._id, qty: productQty }));
    }
  }

  const handleDecrement = () => {
    if (qty > 1) {
      dispatch(updateQty({ id: product._id, qty: qty - 1 }));
    }else{
      handleRemove(product._id);
    }
  }

  return (
    <>
      <div className="bg-nav-white flex flex-row justify-center self-center rounded-xl m-3 p-4 border-2 border-nav-color w-5/6"
      
      >
        <div className="flex justify-center self-center">
          <img
            className="rounded-xl w-[150px] cursor-pointer"
            src={product.image}
            alt={product.title}
            onClick={()=> navigate(`/product/${product._id}`)}
          />
        </div>
        <div className="flex flex-col w-full pl-8">
          <div className="flex justify-between" >
            <h1 className="font-semibold text-nav-color text-lg tracking-wide cursor-pointer" onClick={()=> navigate(`/product/${product._id}`)} >
              {product.title}
            </h1>
            <button className="text-xl" onClick={()=>handleRemove(product._id)}>
              <MdDeleteOutline />
            </button>
          </div>
          <div className="cursor-pointer" onClick={()=> navigate(`/product/${product._id}`)}>
            <p className="text-sm text-black-heading mt-4 w-4/5 font-medium">
              {product.description.substring(0, 100)}
            </p>
          </div>
          <div className="flex flex-row justify-between mt-4">
            <p className="text-lg text-black-color font-semibold">
              ${product.price * qty}
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
