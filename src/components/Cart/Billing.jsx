import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Billing() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className="bg-nav-white flex flex-col justify-center self-center rounded-xl m-3 p-4 border-2 border-nav-color ">
          <h1 className="text-base text-nav-color tracking-wider ">
            PAYMENT DETAILS
          </h1>
          <div className="flex flex-row justify-between mt-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-base font-semibold text-nav-color">
                Subtotal
              </h1>
              <h1 className="text-base font-semibold text-nav-color">
                Shipping
              </h1>
              <h1 className="text-base font-semibold text-nav-color">
                Discount
              </h1>
              <h1 className="text-base font-semibold text-text-green mt-4">
                Total
              </h1>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-base font-semibold text-nav-color">$100</h1>
              <h1 className="text-base font-semibold text-nav-color">$10</h1>
              <h1 className="text-base font-semibold text-nav-color">$10</h1>
              <h1 className="text-base font-semibold text-text-green mt-4">
                $100
              </h1>
            </div>
          </div>
          {
            isAuthenticated ? (
              <button className="bg-button-color text-nav-white font-semibold px-4 py-2 rounded-lg mt-4 transition duration-400 ease-out hover:ease-in transform hover:scale-110">
            Proceed to Checkout
          </button>
            ) : (
              <button onClick={()=> navigate("/login")} className="bg-button-color text-nav-white font-semibold px-4 py-2 rounded-lg mt-4 transition duration-400 ease-out hover:ease-in transform hover:scale-110">
            Login 
          </button>
            )
          }
          
        </div>
      </div>
    </>
  );
}

export default Billing;
