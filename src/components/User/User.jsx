import React from "react";
import { Button } from "../index";
import Man from "../../assets/man.png";
import { MdModeEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function User() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.userData);
  const userName = userData?.username || "User";
  const userEmail = userData?.email || "user@gmail.com";
  const userNumber = userData?.phoneNumber || "79732-03702";

  return (
    <div className="flex flex-row w-full justify-center m-10 gap-10">
      {isAuthenticated ? (
        <>
          <div className="w-1/3 flex flex-row bg-nav-white h-[120px] rounded-lg p-4 gap-2">
            <div className="flex justify-center self-center w-1/3">
              <img width="80" height="80" src={Man} alt="user" />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-semibold text-nav-color text-xl">
                {userName}
              </h1>
              <p className="text-black-heading text-sm italic">{userEmail}</p>
              {/* <p className="text-black-heading text-sm italic font-serif">
                +91 {userNumber}
              </p> */}
              <p className="text-nav-color font-semibold cursor-pointer text-sm italic" onClick={() => navigate("/changePassword")}>Change Password</p>
            </div>
          </div>
          <div className="flex flex-col gap-5 w-2/3">
            <div className="flex flex-col w-4/5 justify-center bg-nav-white rounded-lg p-8 pb-4">
              <div className="w-full flex flex-row">
                <div className="flex flex-col w-1/2 gap-3">
                  <h1 className="text-sm text-heading-color font-semibold">
                    LOGIN INFORMATION{" "}
                  </h1>
                  <div className="flex flex-col p-3 gap-2">
                    <div className="flex flex-col pb-3 gap-1">
                      <p className="text-sm font-medium text-button-color">
                        EMAIL
                      </p>
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
                      <p className="text-sm font-medium text-button-color">
                        Gender
                      </p>
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
            <div className="flex flex-col w-4/5 justify-center bg-nav-white rounded-lg p-8 pb-4">
              <div className="w-full flex flex-row">
                <div className="flex flex-col w-1/2 gap-3">
                  <h1 className="text-sm text-heading-color font-semibold">
                    ADDRESS INFORMATION{" "}
                  </h1>
                  <div className="flex flex-col p-3 gap-2">
                    <div className="flex flex-col pb-3 gap-1">
                      <p className="text-sm font-medium text-button-color">
                        ADDRESS
                      </p>
                      <p className="text-sm font-medium text-heading-color border-b border-text-heading">
                        HOUSE 296B
                      </p>
                    </div>
                    <div className="flex flex-col pb-3 gap-1">
                      <p className="text-sm font-medium text-button-color">
                        CITY
                      </p>
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
                      <p className="text-sm font-medium text-button-color">
                        PIN CODE
                      </p>
                      <p className="text-sm font-medium text-heading-color border-b border-text-heading">
                        148024
                      </p>
                    </div>
                    <div className="flex flex-col pb-3 gap-1">
                      <p className="text-sm font-medium text-button-color">
                        DISTRICT
                      </p>
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
        </>
      ) : (
        <div className="w-1/3 flex flex-row bg-nav-white h-[120px] rounded-lg p-4 gap-2">
          <div className="flex justify-center self-center w-1/3">
            <img width="80" height="80" src={Man} alt="user" />
          </div>
          <div className="flex flex-col gap-4 h-full w-full justify-center self-center">
            <h1 className="font-semibold text-nav-color text-xl text-center">
              Kindly Login
            </h1>
            <p
              className="text-black-heading text-sm italic font-serif cursor-pointer text-center"
              onClick={() => navigate("/login")}
            >
              Login Now
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
