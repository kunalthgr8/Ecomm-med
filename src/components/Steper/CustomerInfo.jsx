import React from "react";
import { Button, Input } from "../index";
import { MdModeEdit } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { login } from "../../store/auth/authSlice.js";
function CustomerInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.userData);
  const [editAbleUser, setEditAbleUser] = React.useState(false);
  const [data, setData] = React.useState({
    email: userData?.email || "No Email Found",
    phoneNumber: userData?.phoneNumber || "No Number Found",
    fullname: userData?.fullname || "User Name Not Found",
    gender: userData?.gender || "Male",
  });

  const saveButtonHandler = async () => {
    if (
      data.fullname === "" ||
      data.email === "" ||
      data.gender === "" ||
      data.phoneNumber === ""
    ) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const user = await authService.changeUserDetails(data);
      if (user) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          localStorage.setItem("userData", JSON.stringify(userData.data.data));
          dispatch(login(userData.data.data));
          setEditAbleUser(false);
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
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const capitalizeName = (name) =>
    name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const fullname = capitalizeName(data.fullname);
  return (
    <div className="flex flex-col justify-center self-center gap-5 w-full mt-10 mb-10 ">
      <div className="flex flex-col w-full md:w-4/5 m-auto justify-center bg-nav-white rounded-lg p-8 pb-4">
        <div className="w-full flex flex-row">
          <div className="flex flex-col w-1/2 gap-3">
            <h1 className="text-xs sm:text-sm text-heading-color font-semibold">
              LOGIN INFORMATION
            </h1>
            <div className="flex flex-col p-3 gap-2">
              <div className="flex flex-col pb-3 gap-1">
                <p className="text-xs sm:text-sm font-medium text-button-color">EMAIL</p>
                {editAbleUser ? (
                  <Input
                    type="email"
                    name="email"
                    value={data.email}
                    placeholder="Email"
                    className="text-xs sm:text-sm font-medium text-heading-color border-b border-text-heading"
                    onChange={handleChange}
                  />
                ) : (
                  <p className="text-xs sm:text-sm font-medium text-heading-color border-b border-text-heading">
                    {data.email}
                  </p>
                )}
              </div>
              <div className="flex flex-col pb-3 gap-1">
                <p className="text-xs sm:text-sm font-medium text-button-color">
                  MOBILE NUMBER
                </p>
                {editAbleUser ? (
                  <Input
                    type="text"
                    name="phoneNumber"
                    value={data.phoneNumber}
                    placeholder="Mobile Number"
                    className="text-xs sm:text-sm font-medium text-heading-color border-b border-text-heading"
                    onChange={handleChange}
                  />
                ) : (
                  <p className="text-xs sm:text-sm font-medium text-heading-color border-b border-text-heading">
                    {data.phoneNumber}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-1/2 gap-3">
            <h1 className="text-xs sm:text-sm text-heading-color font-semibold">
              PERSONAL INFORMATION
            </h1>
            <div className="flex flex-col p-3 gap-2">
              <div className="flex flex-col pb-3 gap-1">
                <p className="text-xs sm:text-sm font-medium text-button-color">
                  FULL NAME
                </p>
                {editAbleUser ? (
                  <Input
                    type="text"
                    name="fullname"
                    value={data.fullname}
                    placeholder="Full Name"
                    className="text-xs sm:text-sm font-medium text-heading-color border-b border-text-heading"
                    onChange={handleChange}
                  />
                ) : (
                  <p className="text-xs sm:text-sm font-medium text-heading-color border-b border-text-heading">
                    {data.fullname}
                  </p>
                )}
              </div>
              <div className="flex flex-col pb-3 gap-1">
                <p className="text-xs sm:text-sm font-medium text-button-color">GENDER</p>
                {editAbleUser ? (
                  <Input
                    type="text"
                    name="gender"
                    value={data.gender}
                    placeholder="Gender"
                    className="text-xs sm:text-sm font-medium text-heading-color border-b border-text-heading"
                    onChange={handleChange}
                  />
                ) : (
                  <p className="text-xs sm:text-sm font-medium text-heading-color border-b border-text-heading">
                    {data.gender}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full text-right">
          <Button
            width="flex justify-end"
            className="bg-button-color text-xs sm:text-sm flex justify-center self-center gap-1 px-4 text-center rounded-lg text-nav-white"
            onClick={
              editAbleUser ? saveButtonHandler : () => setEditAbleUser(true)
            }
          >
            <MdModeEdit className="flex justify-center self-center" />
            {editAbleUser ? "Save Details" : "Edit Info"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CustomerInfo;
