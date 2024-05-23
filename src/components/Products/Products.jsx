import React from "react";
import { Card, Filter } from "../index";

function Products() {
  const cards = Array(20).fill(null); // Array to hold the number of cards

  return (
    <div className="flex w-full h-full mt-10">
      <div className="w-4/5 flex flex-wrap gap-2 m-10">
        <div className="w-full">
          <div className="flex flex-row flex-wrap justify-center self-center gap-10 w-full">
            {cards.map((_, index) => (
              <div key={index} className="w-[230px] h-[285px]">
                <Card className="border-2 border-nav-color hover:border-2 hover:border-text-green cursor-pointer" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-1/5">
        <Filter />
      </div>
    </div>
  );
}

export default Products;
