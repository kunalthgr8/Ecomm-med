import React from "react";
import { Button } from "../index";
import { MdModeEdit } from "react-icons/md";
function Shiping() {
  return (
    <div className="flex flex-col justify-center self-center gap-5 w-full mt-10 mb-10  ">
    <div className="flex flex-col w-4/5 justify-center m-auto bg-nav-white rounded-lg p-8 pb-4">
      <div className="w-full flex flex-row">
        <div className="flex flex-col w-1/2 gap-3">
          <h1 className="text-sm text-heading-color font-semibold">
            ADDRESS INFORMATION{" "}
          </h1>
          <div className="flex flex-col p-3 gap-2">
            <div className="flex flex-col pb-3 gap-1">
              <p className="text-sm font-medium text-button-color">ADDRESS</p>
              <p className="text-sm font-medium text-heading-color border-b border-text-heading">
                HOUSE 296B
              </p>
            </div>
            <div className="flex flex-col pb-3 gap-1">
              <p className="text-sm font-medium text-button-color">CITY</p>
              <p className="text-sm font-medium text-heading-color border-b border-text-heading">
                DHURI
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-1/2 gap-3">
          <h1 className="text-sm text-heading-color font-semibold">
            LOCATION INFORMATION{" "}
          </h1>
          <div className="flex flex-col p-3 gap-2">
            <div className="flex flex-col pb-3 gap-1">
              <p className="text-sm font-medium text-button-color">PIN CODE</p>
              <p className="text-sm font-medium text-heading-color border-b border-text-heading">
                148024
              </p>
            </div>
            <div className="flex flex-col pb-3 gap-1">
              <p className="text-sm font-medium text-button-color">DISTRICT</p>
              <p className="text-sm font-medium text-heading-color border-b border-text-heading">
                SANGRUR
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full text-right">
        <Button
          width="flex justify-end"
          className="bg-button-color flex justify-center self-center gap-1 px-4 text-center rounded-lg text-nav-white"
        >
          <MdModeEdit className="flex justify-center self-center" />
          Edit Info
        </Button>
      </div>
    </div>
    </div>
  );
}

export default Shiping;
