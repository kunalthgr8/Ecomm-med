import React from "react";
import { Button, Input } from "../index";
import { MdModeEdit } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth.js";
import { login } from "../../store/auth/authSlice.js";

function Shiping() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userLocationData = useSelector((state) => state.auth.userData);
  const [editAbleLocationUser, setEditAbleLocationUser] = React.useState(false);
  const [dataLocation, setDataLocation] = React.useState({
    address: userLocationData?.address || "Enter Your Address",
    pincode: userLocationData?.pincode || "Enter your Pincode",
    district: userLocationData?.district || "Enter your District",
    city: userLocationData?.city || "Enter your City",
  });

  const saveButtonLocationHandler = async () => {
    if (
      dataLocation.address.trim() === "" ||
      dataLocation.pincode.trim() === "" ||
      dataLocation.district.trim() === "" ||
      dataLocation.city.trim() === ""
    ) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const user = await authService.updateUserLocationDetails(dataLocation);
      if (user) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          localStorage.setItem("userData", JSON.stringify(userData.data.data));
          dispatch(login(userData.data.data));
          setEditAbleLocationUser(false);
        }
      }
    } catch (error) {
      console.log("User :: saveButtonHandler :: error", error);
      alert("Error while saving data");
    }
    // Save data logic here
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataLocation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col justify-center self-center gap-5 w-full mt-10 mb-10  ">
      <div className="flex flex-col w-full md:w-4/5 justify-center m-auto bg-nav-white rounded-lg p-8 pb-4">
        <div className="w-full flex flex-row">
          <div className="flex flex-col w-1/2 gap-3">
            <h1 className="text-xs sm:text-sm text-heading-color font-semibold">
              ADDRESS INFORMATION{" "}
            </h1>
            <div className="flex flex-col p-3 gap-2">
              <div className="flex flex-col pb-3 gap-1">
                <p className="text-xs sm:text-sm font-medium text-button-color">ADDRESS</p>
                {editAbleLocationUser ? (
                  <Input
                    type="text"
                    name="address"
                    value={dataLocation.address}
                    placeholder="Address"
                    className="text-xs sm:text-sm font-medium text-heading-color border-b border-text-heading"
                    onChange={handleChange}
                  />
                ) : (
                  <p className="text-xs sm:text-sm font-medium text-heading-color border-b border-text-heading">
                    {dataLocation.address}
                  </p>
                )}
              </div>
              <div className="flex flex-col pb-3 gap-1">
                <p className="text-xs sm:text-sm font-medium text-button-color">CITY</p>
                {editAbleLocationUser ? (
                  <Input
                    type="text"
                    name="city"
                    value={dataLocation.city}
                    placeholder="City"
                    className="text-xs sm:text-sm font-medium text-heading-color border-b border-text-heading"
                    onChange={handleChange}
                  />
                ) : (
                  <p className="text-xs sm:text-sm font-medium text-heading-color border-b border-text-heading">
                    {dataLocation.city}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-1/2 gap-3">
            <h1 className="text-xs sm:text-sm text-heading-color font-semibold">
              LOCATION INFORMATION{" "}
            </h1>
            <div className="flex flex-col p-3 gap-2">
              <div className="flex flex-col pb-3 gap-1">
                <p className="text-xs sm:text-sm font-medium text-button-color">
                  PIN CODE
                </p>
                {editAbleLocationUser ? (
                  <Input
                    type="text"
                    name="pincode"
                    value={dataLocation.pincode}
                    placeholder="PIN Code"
                    className="text-xs sm:text-sm font-medium text-heading-color border-b border-text-heading"
                    onChange={handleChange}
                  />
                ) : (
                  <p className="text-xs sm:text-sm font-medium text-heading-color border-b border-text-heading">
                    {dataLocation.pincode}
                  </p>
                )}
              </div>
              <div className="flex flex-col pb-3 gap-1">
                <p className="text-xs sm:text-sm font-medium text-button-color">
                  DISTRICT
                </p>
                {editAbleLocationUser ? (
                  <Input
                    type="text"
                    name="district"
                    value={dataLocation.district}
                    placeholder="District"
                    className="text-xs sm:text-sm font-medium text-heading-color border-b border-text-heading"
                    onChange={handleChange}
                  />
                ) : (
                  <p className="text-xs sm:text-sm font-medium text-heading-color border-b border-text-heading">
                    {dataLocation.district}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full text-right">
        <Button
            width="flex justify-end"
            className="bg-button-color flex text-xs sm:text-sm justify-center self-center gap-1 px-4 text-center rounded-lg text-nav-white"
            onClick={
              editAbleLocationUser ? saveButtonLocationHandler : () => setEditAbleLocationUser(true)
            }
          >
            <MdModeEdit className="flex justify-center self-center" />
            {editAbleLocationUser ? "Save Details" : "Edit Info"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Shiping;
