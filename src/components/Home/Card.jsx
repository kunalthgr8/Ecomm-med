import React, { useEffect, useState, useCallback } from "react";
import { Button } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQty, removeFromCart } from "../../store/cart/cartSlice";
import { useNavigate } from "react-router-dom";

function Card({ className, prod }) {
  const [isInCart, setIsInCart] = useState(false);
  const [qty, setQty] = useState(0);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const itemInCart = cart.find((item) => item.product._id === prod._id);
    if (itemInCart) {
      setIsInCart(true);
      setQty(itemInCart.qty);
    } else {
      setIsInCart(false);
      setQty(0);
    }
  }, [cart, prod._id]);

  const handleSubmit = useCallback(() => {
    const item = cart.find((item) => item.product._id === prod._id);
    if (item) {
      handleIncrement();
    } else {
      setIsInCart(true);
      dispatch(addToCart({ qty: 1, product: prod }));
    }
  }, [cart, prod, dispatch]);

  const handleIncrement = useCallback(() => {
    const newQty = qty + 1;
    if (newQty > prod.stock) {
      setQty(prod.stock);
      dispatch(updateQty({ id: prod._id, qty: prod.stock }));
    } else {
      setQty(newQty);
      dispatch(updateQty({ id: prod._id, qty: newQty }));
    }
  }, [qty, prod, dispatch]);

  const handleDecrement = useCallback(() => {
    if (qty > 1) {
      const newQty = qty - 1;
      setQty(newQty);
      dispatch(updateQty({ id: prod._id, qty: newQty }));
    } else {
      dispatch(removeFromCart(prod._id));
    }
  }, [qty, prod, dispatch]);

  return (
    <div className={`bg-nav-white w-full h-full grid gap-4 p-4 rounded-lg ${className}`}>
      <div className="flex justify-center p-2" onClick={() => navigate(`/product/${prod._id}`)}>
        <img className="rounded-xl w-[70px] h-[80px]" src={prod.image} alt={prod.name} />
      </div>
      <div className="flex flex-col items-center text-left" onClick={() => navigate(`/product/${prod._id}`)}>
        <h3 className="text-nav-color font-bold tracking-wider">
          {prod.name.substring(0, 20)}
        </h3>
        <p className="text-black-heading text-sm mt-2 font-semibold">
          ${prod.price}
        </p>
        {prod.stock <= 0 && (
          <p className="text-sm text-logout-color font-bold mt-1">Out Of Stock</p>
        )}
      </div>
      {prod.stock > 0 && (
        <div className="w-full flex justify-center">
          {!isInCart ? (
            <Button
              onClick={handleSubmit}
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
      )}
    </div>
  );
}

export default Card;
