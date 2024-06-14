import React, { useEffect, useState } from "react";
import { Button } from "../index";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  updateQty,
  removeFromCart,
} from "../../store/cart/cartSlice";
import { useNavigate } from "react-router-dom";

function Card({ className, prod }) {
  const [isInCart, setIsInCart] = useState(false);
  const [qty, setQty] = useState(0);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const itemInCart = cart.find((item) => item.product._id === prod._id);
    console.log("Cart", cart);
    if (itemInCart) {
      if (!isInCart) setIsInCart(true);
      if (qty !== itemInCart.qty) setQty(itemInCart.qty);
    } else {
      if (isInCart) setIsInCart(false);
      if (qty !== 0) setQty(0);
    }
  }, [cart, prod._id]);

  const handleSubmit = (id) => {
    console.log("id", id);
    let item = cart.find((item) => item.product.id === id);
    console.log("item", item);
    if (item) {
      handleIncrement();
    } else {
      setIsInCart(true);
      dispatch(addToCart({ qty: 1, product: prod }));
    }
  };

  const handleIncrement = () => {
    const newQty = qty + 1;
    setQty(newQty);
    dispatch(updateQty({ id: prod._id, qty: newQty }));
  };

  const handleDecrement = () => {
    if (qty > 1) {
      const newQty = qty - 1;
      setQty(newQty);
      dispatch(updateQty({ id: prod._id, qty: newQty }));
    } else {
      dispatch(removeFromCart(prod._id));
    }
  };

  return (
    <div
      className={`bg-nav-white w-full h-full grid gap-4 p-4 rounded-lg ${className}`}
    >
      <div
        className="flex justify-center p-2"
        onClick={() => navigate(`/product/${prod._id}`)}
      >
        <img
          className="rounded-xl w-[70px] h-[80px]"
          src={prod.image}
          alt={prod.name}
        />
      </div>
      <div
        className="flex flex-col items-center text-left"
        onClick={() => navigate(`/product/${prod._id}`)}
      >
        <h3 className="text-nav-color font-bold tracking-wider">
          {prod.name.substring(0, 20)}
        </h3>
        <p className="text-black-heading text-sm mt-2 font-semibold">
          ${prod.price}
        </p>
      </div>
      <div className="w-full flex justify-center">
        {!isInCart ? (
          <Button
            onClick={() => handleSubmit(prod._id)}
            className="bg-button-color w-full text-sm text-nav-white rounded-lg font-semibold transition-transform duration-400 hover:scale-110"
          >
            ADD TO CART
          </Button>
        ) : (
          <div className="flex flex-row justify-center self-center bg-button-color text-nav-white font-semibold px-3 py-1 rounded-xl gap-2">
            <p className="text-2xl cursor-pointer" onClick={handleDecrement}>
              -
            </p>
            <p className="flex justify-center self-center">Qty: {qty}</p>
            <p className="text-2xl cursor-pointer" onClick={handleIncrement}>
              +
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
