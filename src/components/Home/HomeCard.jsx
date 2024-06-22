import React, { useState, useEffect, useMemo } from "react";
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
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint1 = 1217;
  const breakpoint2 = 815;
  const breakpoint3 = 580;
  const numberOfSlides = width < breakpoint3 ? 1 : width < breakpoint2 ? 2 : width < breakpoint1 ? 3 : 4;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slicedProducts = useMemo(
    () => products.slice(currentIndex, currentIndex + numberOfSlides),
    [currentIndex, products, numberOfSlides]
  );

  const gotoNextSlide = () => {
    setCurrentIndex((prevIdx) =>
      prevIdx + numberOfSlides >= len ? 0 : prevIdx + numberOfSlides
    );
  };

  const gotoPrevSlide = () => {
    setCurrentIndex((prevIdx) =>
      prevIdx === 0 ? len - numberOfSlides : prevIdx - numberOfSlides
    );
  };

  return (
    <div className="flex flex-col gap-10 m-5">
      <div>
        <h1 className="text-black-heading text-2xl font-bold ml-3">
          Trending Items
        </h1>
      </div>
      {status === STATUSES.LOADING ? (
        <div className="flex justify-center self-center gap-10 w-full">
          <Loader />
        </div>
      ) : (
        <div className="relative w-full mx-auto">
          <div className="slider flex overflow-hidden items-center justify-center gap-4">
            {slicedProducts.map((product, index) => (
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
            aria-label="Previous Slide"
          >
            &#10094;
          </button>
          <button
            onClick={gotoNextSlide}
            className="absolute top-1/2 transform -translate-y-1/2 right-0 bg-transparent border-none text-black-heading text-3xl"
            aria-label="Next Slide"
          >
            &#10095;
          </button>
        </div>
      )}
    </div>
  );
}

export default HomeCard;
