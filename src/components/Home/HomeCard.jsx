import React, { useState, useEffect } from "react";
import { Card } from "../index";
import { Loader } from "../index";
import { fetchProducts } from "../../store/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES } from "../../store/product/productSlice";

function HomeCard() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.data);
  const status = useSelector((state) => state.product.status);
  const len = products.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  const gotoNextSlide = () => {
    setCurrentIndex((prevIdx) => (prevIdx === len - 4 ? 0 : prevIdx + 1));
  };
  const gotoPrevSlide = () => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? len - 4 : prevIdx - 1));
  };
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <>
      <div className="flex flex-col gap-10 m-5">
        <div>
          <h1 className="text-black-heading text-2xl font-bold ml-3">
            Trending Items
          </h1>
        </div>
        {status === STATUSES.LOADING && (
          <div className="flex justify-center self-center gap-10 w-full">
            <Loader />
          </div>
        )}
        {status === STATUSES.IDLE && (
          <div className="relative w-full mx-auto">
            <div className="slider flex overflow-hidden items-center justify-center gap-4 ">
              {products
                .slice(currentIndex, currentIndex + 4)
                .map((product, index) => (
                  <div
                    key={index}
                    className="slider flex-shrink-0 justify-center items-center w-[200px] h-[270px]"
                  >
                    <Card
                      prod={product}
                      className="border-2 border-nav-color hover:border-2 hover:border-text-green cursor-pointer"
                    />
                  </div>
                ))}
            </div>
            <button
              onClick={gotoPrevSlide}
              className="absolute top-1/2 transform -translate-y-1/2 left-0 bg-transparent border-none text-black-heading text-3xl"
            >
              &#10094;
            </button>
            <button
              onClick={gotoNextSlide}
              className="absolute top-1/2 transform -translate-y-1/2 right-0 bg-transparent border-none text-black-heading text-3xl"
            >
              &#10095;
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default HomeCard;
