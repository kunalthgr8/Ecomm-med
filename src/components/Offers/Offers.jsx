import React from "react";
import { OffersCard } from "../index.js";
function Offers() {
  return (
    <>
      <div className="flex flex-wrap gap-5 justify-evenly mt-10 mb-20 w-full h-screen ">
        <OffersCard />
        <OffersCard />
        <OffersCard />
        <OffersCard />
      </div>
    </>
  );
}

export default Offers;
