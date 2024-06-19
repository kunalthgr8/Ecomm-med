import React, { useEffect, useState } from "react";
import orderService from "../../appwrite/order";
import Empty from "../../assets/empty.svg";
import { useNavigate } from "react-router-dom";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const resp = await orderService.getMyOrders();

        setOrders(resp.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHistory();
  }, []); // Add an empty dependency array to run this effect only once

  return (
    <>
      {orders.length > 0 ? (
        <div className="flex flex-col mt-10 self-center w-4/5 h-full">
          {orders.map((order) => (
            <div className=" flex flex-col w-full gap-3" key={order.id}>
              <div className="text-logout-color font-bold text-base">
                {" "}
                Status: {order.orderStatus}
              </div>
              <div className="text-logout-color font-bold text-base">
                Price: {order.totalPrice}
              </div>
              {order.orderItems.map((item) => (
                <div
                  onClick={() => navigate(`/product/${item.product}`)}
                  className="flex flex-row justify-center self-center w-3/4 border-2 border-nav-color rounded-lg bg-nav-white"
                >
                  <div className="flex justify-center self-center m-auto">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="rounded-xl w-[120px] h-[120px] "
                    />
                  </div>
                  <div className="w-2/3 mx-auto md:px-20">
                    <div className="top h-fit flex flex-col gap-2">
                      <div className="text-nav-color mt-2 text-l font-bold tracking-wide md:text-3xl sm:text-2xl">
                        {item.name}
                      </div>
                      <hr className="border-t-2 border-black-heading" />
                    </div>
                    <div className="bottom min-h-36 py-5 text-lg">
                      <div className="price flex-col">
                        <div className="flex start gap-2">
                          <div className="money text-base font-bold text-logout-color">
                            MRP
                          </div>
                          <div className="money text-text-green text-base">
                            <b>Rs. {item.price}</b>
                          </div>
                        </div>
                        <div className="flex start gap-2">
                          <div className="money text-base font-bold text-logout-color">
                            Qty:
                          </div>
                          <div className="money text-text-green text-base">
                            <b>{item.qty}</b>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center w-5/6 mt-10 h-full justify-center self-center">
          <img src={Empty} alt="Your Cart is Empty" width="300px" />
          <h1 className="text-xl text-black-heading font-bold tracking-widest m-3">
            Start shopping now!
          </h1>
        </div>
      )}
    </>
  );
}

export default OrderHistory;
