import React from "react";
import { OffersCard } from "../index.js";
import Offer from "../../assets/offer.jpg";
import { useSelector } from "react-redux";

function Offers() {

  const offers = useSelector((state) => state.offer);

  return (
    <>
      <div className="flex flex-wrap gap-5 justify-evenly ml-15 mt-10 mb-20 w-full h-screen ">
        {offers.map((offer, index) => (
          <OffersCard
            key={index}
            code={offer.code}
            imageSrc={offer.image}
            description={offer.description}
            validity={offer.validity}
          />
        ))}
      </div>
    </>
  );
}

export default Offers;
