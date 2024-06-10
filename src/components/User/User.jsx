import React from "react";
import { Button, Input } from "../index";
import Man from "../../assets/man.png";
import { MdModeEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import {login} from "../../store/auth/authSlice"
function User() {
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
        console.log("User :: saveButtonHandler :: userData", userData);
        if (userData) {
          localStorage.setItem("userData", JSON.stringify(userData.data.data));
          dispatch(login(userData.data.data));
          navigate("/");
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
    <div className="flex flex-row w-full justify-center m-10 gap-10">
      {isAuthenticated ? (
        <>
          <div className="w-1/3 flex flex-row bg-nav-white h-[120px] rounded-lg p-4 gap-2">
            <div className="flex justify-center self-center w-1/3">
              <img width="80" height="80" src={Man} alt="user" />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-semibold text-nav-color text-xl">
                {fullname}
              </h1>
              <p className="text-black-heading text-sm italic">{data.email}</p>
              <p
                className="text-nav-color font-semibold cursor-pointer text-sm italic"
                onClick={() => navigate("/changePassword")}
              >
                Change Password
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5 w-2/3">
            <div className="flex flex-col w-4/5 justify-center bg-nav-white rounded-lg p-8 pb-4">
              <div className="w-full flex flex-row">
                <div className="flex flex-col w-1/2 gap-3">
                  <h1 className="text-sm text-heading-color font-semibold">
                    LOGIN INFORMATION
                  </h1>
                  <div className="flex flex-col p-3 gap-2">
                    <div className="flex flex-col pb-3 gap-1">
                      <p className="text-sm font-medium text-button-color">
                        EMAIL
                      </p>
                      {editAbleUser ? (
                        <Input
                          type="email"
                          name="email"
                          value={data.email}
                          placeholder="Email"
                          className="text-sm font-medium text-heading-color border-b border-text-heading"
                          onChange={handleChange}
                        />
                      ) : (
                        <p className="text-sm font-medium text-heading-color border-b border-text-heading">
                          {data.email}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col pb-3 gap-1">
                      <p className="text-sm font-medium text-button-color">
                        MOBILE NUMBER
                      </p>
                      {editAbleUser ? (
                        <Input
                          type="text"
                          name="phoneNumber"
                          value={data.phoneNumber}
                          placeholder="Mobile Number"
                          className="text-sm font-medium text-heading-color border-b border-text-heading"
                          onChange={handleChange}
                        />
                      ) : (
                        <p className="text-sm font-medium text-heading-color border-b border-text-heading">
                          {data.phoneNumber}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-1/2 gap-3">
                  <h1 className="text-sm text-heading-color font-semibold">
                    PERSONAL INFORMATION
                  </h1>
                  <div className="flex flex-col p-3 gap-2">
                    <div className="flex flex-col pb-3 gap-1">
                      <p className="text-sm font-medium text-button-color">
                        FULL NAME
                      </p>
                      {editAbleUser ? (
                        <Input
                          type="text"
                          name="fullname"
                          value={data.fullname}
                          placeholder="Full Name"
                          className="text-sm font-medium text-heading-color border-b border-text-heading"
                          onChange={handleChange}
                        />
                      ) : (
                        <p className="text-sm font-medium text-heading-color border-b border-text-heading">
                          {data.fullname}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col pb-3 gap-1">
                      <p className="text-sm font-medium text-button-color">
                        GENDER
                      </p>
                      {editAbleUser ? (
                        <Input
                          type="text"
                          name="gender"
                          value={data.gender}
                          placeholder="Gender"
                          className="text-sm font-medium text-heading-color border-b border-text-heading"
                          onChange={handleChange}
                        />
                      ) : (
                        <p className="text-sm font-medium text-heading-color border-b border-text-heading">
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
                  className="bg-button-color flex justify-center self-center gap-1 px-4 text-center rounded-lg text-nav-white"
                  onClick={
                    editAbleUser
                      ? saveButtonHandler
                      : () => setEditAbleUser(true)
                  }
                >
                  <MdModeEdit className="flex justify-center self-center" />
                  {editAbleUser ? "Save Details" : "Edit Info"}
                </Button>
              </div>
            </div>
            <div className="flex flex-col w-4/5 justify-center bg-nav-white rounded-lg p-8 pb-4">
              <div className="w-full flex flex-row">
                <div className="flex flex-col w-1/2 gap-3">
                  <h1 className="text-sm text-heading-color font-semibold">
                    ADDRESS INFORMATION
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
                    LOCATION INFORMATION
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
              Click here to Login
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
