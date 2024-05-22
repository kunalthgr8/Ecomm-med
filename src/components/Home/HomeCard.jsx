import React, { useState } from "react";
import { Card } from "../index";
function HomeCard() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const products = [
    {
      item: Card,
    },
    {
      item: Card,
    },
    {
      item: Card,
    },
    {
      item: Card,
    },
    {
      item: Card,
    },
    {
      item: Card,
    },
    {
      item: Card,
    },
    {
      item: Card,
    },
    {
      item: Card,
    },
    {
      item: Card,
    },
  ];
  let len = products.length;
  const gotoNextSlide = () => {
    console.log(currentIndex);
    setCurrentIndex((prevIdx) => (prevIdx === len - 1 ? 0 : prevIdx + 1));

  };
  const gotoPrevSlid = () => {
    console.log(currentIndex);
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? len - 1 : prevIdx - 1));
  };
  return (
    <>
      <div className="flex flex-col gap-10 m-5">
        <div>
          <h1 className="text-black-heading text-2xl font-bold">
            Trending Items
          </h1>
        </div>
        <div className="relative w-full mx-auto">
          <div className="slider flex overflow-hidden items-center justify-center gap-4 ">
            {products

              .map((product, index) => {
                return (
                  <div
                    key={index}
                    className="slider flex-shrink-0 justify-center items-center w-[200px] h-[270px] "
                  >
                    <product.item num={index} />
                  </div>
                );
              })
              .slice(currentIndex, currentIndex + 4)}
          </div>
          <button
            onClick={gotoPrevSlid}
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
      </div>
    </>
  );
}

export default HomeCard;
