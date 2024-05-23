import React from "react";
import { OffersCard } from "../index.js";
function Offers() {
  return (
    <>
      <div className="grid grid-cols-3 gap-5 justify-evenly ml-10 mt-10 mb-20 w-full h-screen ">
        <OffersCard />
        <OffersCard />
        <OffersCard />
        <OffersCard />
      </div>
    </>
  );
}

export default Offers;
