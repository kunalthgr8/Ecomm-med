import React from "react";
import { Button as Btn } from "../index";
import { useSelector } from "react-redux";
import orderService from "../../appwrite/order";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/cart/cartSlice";
import axios from "axios";

function PaymentInfo() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const orderItems = cart.map((product) => ({
      name: product.product.name,
      qty: product.qty,
      image: product.product.image,
      price: product.product.price,
      product: product.product._id,
    }));

    const data = {
      orderItems,
      // paymentInfo: {
      //   id: "payment_id_123", // Mock payment ID
      //   status: "Completed", // Mock payment status
      // },
      paidAt: new Date(),
      itemsPrice: orderItems.reduce(
        (total, item) => total + item.price * item.qty,
        0
      ),
      taxPrice:
        orderItems.reduce((total, item) => total + item.price * item.qty, 0) *
        0.3, // Calculate tax based on itemsPrice or other rules
      shippingPrice: 10, // Calculate shipping based on rules or cart data
      totalPrice:
        orderItems.reduce((total, item) => total + item.price * item.qty, 0) +
        orderItems.reduce((total, item) => total + item.price * item.qty, 0) *
          0.3 +
        10,
      orderStatus: "Processing",
    };
    let resp1;

    try {
      resp1 = await orderService.payment(orderItems);
    } catch (error) {
      console.log(error);
    }

    try {
      data.PaymentInfo = {
        id: "payment_id_123", // Mock payment ID
        status: "Completed", // Mock payment status
      };
      const resp = await orderService.addNewProduct(data);
      dispatch(clearCart());
      navigate("/");
    } catch (error) {
      console.error("Error adding new product:", error);
    }
  };

  return (
    <Btn
      onClick={handleSubmit}
      className="bg-button-color text-xs sm:text-sm text-nav-white font-semibold px-4 py-2 rounded-lg mt-4 transition duration-400 ease-out hover:ease-in transform hover:scale-110"
    >
      Proceed Checkout
    </Btn>
  );
}

export default PaymentInfo;
