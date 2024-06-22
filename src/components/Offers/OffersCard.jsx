import React, { useCallback, useState } from "react";
import { Button } from "../index";
import Offer from "../../assets/offer.jpg";

function OffersCard({code, imageSrc, description, validity}) {
  const [copiedClass, setCopiedClass] = useState("bg-text-green");
  const [copyText, setCopyText] = useState("Copy Code");

  const copyCodeToClipboard = useCallback(() => {
    navigator.clipboard
      .writeText("BIG20")
      .then(() => {
        setCopiedClass(
          "bg-button-color transition duration-400 ease-out hover:ease-in transform hover:scale-110"
        );
        setCopyText("Copied");
        setTimeout(() => {
          setCopiedClass("bg-text-green");
          setCopyText("Copy Code");
        }, 1500);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }, []);

  return (
    <div className=" w-[280px] lg:w-[350px] flex flex-col self-center p-2 rounded-lg cursor-pointer bg-nav-white">
      <div className="rounded-lg">
        <img className="w-50 rounded-lg" src={imageSrc} alt="OffersCard" />
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between text-center p-2 mt-2 px-4">
          <h2 className="flex justify-end text-end align-bottom text-nav-color font-semibold text-xl">
            {code}
          </h2>
          <Button
            title={copyText}
            onClick={copyCodeToClipboard}
            width="auto"
            className={`${copiedClass} text-nav-white rounded-xl text-sm px-2 py-1`}
          >
            {copyText}
          </Button>
        </div>
        <div className="text-sm p-2 px-3 font-medium font-sans border-b-2 border-nav-active">
          {description}
        </div>
        <div className="p-2 text-text-green font-semibold tracking-widest font-serif">
          <p>Valid till: {validity}</p>
        </div>
      </div>
    </div>
  );
}

export default OffersCard;
