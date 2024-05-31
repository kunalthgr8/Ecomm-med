import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input,Steper } from "../index";
import { Link } from "react-router-dom";


function Billing() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [discount, setDiscount] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const offer = useSelector((state) => state.offer);

  const total = cart
    .reduce((acc, item) => acc + item.product.price * item.qty, 0)
    .toFixed(2);

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const applyDiscount = () => {
    const discountObj = offer.find((x) => x.code === promoCode);
    if (discountObj) {
      setDiscount(discountObj.discount);
    }
  };

  const discountedTotal = (total - (total * discount) / 100).toFixed(2);

  return (
    <>
      <div className="flex flex-col gap-5">
        <div>
          <div className="bg-nav-white flex flex-col justify-center self-center rounded-xl m-3 p-4 border-2 border-nav-color ">
            <h1 className="text-base text-nav-color underline tracking-wider">
              <Link to="/offers">Promo Code</Link>
            </h1>
            <div className="flex flex-row justify-between mt-4">
              <Input
                type="text"
                value={promoCode}
                onChange={handlePromoCodeChange}
                className="w-2/3 h-12 text-sm border-2 border-nav-color rounded-none rounded-l-lg rounded-r-none px-4"
                placeholder="Enter Promo Code"
              />
              <button
                className="bg-button-color text-nav-white text-sm font-semibold px-4 py-2 rounded-r-lg"
                onClick={applyDiscount}
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-nav-white flex flex-col justify-center self-center rounded-xl m-3 p-4 border-2 border-nav-color ">
            <h1 className="text-base text-nav-color tracking-wider ">
              PAYMENT DETAILS
            </h1>
            <div className="flex flex-row justify-between mt-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-base font-semibold text-nav-color">
                  Total
                </h1>
                <h1 className="text-base font-semibold text-nav-color">
                  Shipping
                </h1>
                <h1 className="text-base font-semibold text-logout-color">
                  Discount
                </h1>
                <h1 className="text-base font-semibold text-text-green mt-4">
                  Total
                </h1>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-base font-semibold text-nav-color">
                  ${total}
                </h1>
                <h1 className="text-base font-semibold text-nav-color">$10</h1>
                <h1 className="text-base font-semibold text-logout-color">
                  ${((total * discount) / 100).toFixed(2)}
                </h1>
                <h1 className="text-base font-semibold text-text-green mt-4">
                  ${(parseFloat(discountedTotal) + 10).toFixed(2)}
                </h1>
              </div>
            </div>
            {isAuthenticated ? (
              <button
              onClick={() => navigate("/stepper")}
              className="bg-button-color text-nav-white font-semibold px-4 py-2 rounded-lg mt-4 transition duration-400 ease-out hover:ease-in transform hover:scale-110">
                Proceed to Checkout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-button-color text-nav-white font-semibold px-4 py-2 rounded-lg mt-4 transition duration-400 ease-out hover:ease-in transform hover:scale-110"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Billing;
