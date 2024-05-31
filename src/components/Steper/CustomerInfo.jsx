import React from "react";
import { Button } from "../index";
import { MdModeEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function CustomerInfo() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.userData);
  const userName = userData?.name || "User";
  const userEmail = userData?.email || "user@gmail.com";
  const userNumber = userData?.phone || "79732-03702";
  return (
    <div className="flex flex-col justify-center self-center gap-5 w-full mt-10 mb-10 ">
      <div className="flex flex-col w-4/5 m-auto justify-center bg-nav-white rounded-lg p-8 pb-4">
        <div className="w-full flex flex-row">
          <div className="flex flex-col w-1/2 gap-3">
            <h1 className="text-sm text-heading-color font-semibold">
              LOGIN INFORMATION{" "}
            </h1>
            <div className="flex flex-col p-3 gap-2">
              <div className="flex flex-col pb-3 gap-1">
                <p className="text-sm font-medium text-button-color">EMAIL</p>
                <p className="text-sm font-medium text-heading-color border-b border-text-heading">
                  {userEmail}
                </p>
              </div>
              <div className="flex flex-col pb-3 gap-1">
                <p className="text-sm font-medium text-button-color">
                  MOBILE NUMBER
                </p>
                <p className="text-sm font-medium text-heading-color border-b border-text-heading">
                  +91 {userNumber}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-1/2 gap-3">
            <h1 className="text-sm text-heading-color font-semibold">
              PERSONAL INFORMATION{" "}
            </h1>
            <div className="flex flex-col p-3 gap-2">
              <div className="flex flex-col pb-3 gap-1">
                <p className="text-sm font-medium text-button-color">
                  FULL NAME
                </p>
                <p className="text-sm font-medium text-heading-color border-b border-text-heading">
                  {userName}
                </p>
              </div>
              <div className="flex flex-col pb-3 gap-1">
                <p className="text-sm font-medium text-button-color">Gender</p>
                <p className="text-sm font-medium text-heading-color border-b border-text-heading">
                  Male
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

export default CustomerInfo;
