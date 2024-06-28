import React from "react";
import { Button, Input } from "../index";
import Man from "../../assets/man.png";
import { MdModeEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth/authSlice";
function User() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.userData);
  const isAdmin = userData?.role === "admin";
  const [editAbleUser, setEditAbleUser] = React.useState(false);
  const [editAbleLocationUser, setEditAbleLocationUser] = React.useState(false);
  const [error, setError] = React.useState("");
  const [data, setData] = React.useState({
    email: userData?.email || "No Email Found",
    phoneNumber: userData?.phoneNumber || "No Number Found",
    fullname: userData?.fullname || "User Name Not Found",
    gender: userData?.gender || "Male",
  });
  const [dataLocation, setDataLocation] = React.useState({
    address: userData?.address || "Enter Your Address",
    pincode: userData?.pincode || "Enter your Pincode",
    district: userData?.district || "Enter your District",
    city: userData?.city || "Enter your City",
  });

  const saveButtonLocationHandler = async () => {
    if (
      dataLocation.address.trim() === "" ||
      dataLocation.pincode.trim() === "" ||
      dataLocation.district.trim() === "" ||
      dataLocation.city.trim() === ""
    ) {
      setError("Please fill all the fields");
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
      setError(error.message);
    }
    // Save data logic here
  };

  const saveButtonHandler = async () => {
    if (
      data.fullname === "" ||
      data.email === "" ||
      data.gender === "" ||
      data.phoneNumber === ""
    ) {
      setError("Please fill all the fields");
      return;
    }
    try {
      const user = await authService.changeUserDetails(data);
      if (user) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          localStorage.setItem("userData", JSON.stringify(userData.data.data));
          dispatch(login(userData.data.data));
          navigate("/");
          setEditAbleUser(false);
        }
      }
    } catch (error) {
      setError(error.message);
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

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setDataLocation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const makeaSeller = async () => {
    try {
      const response = await authService.updateUserToSeller();
      dispatch(login(response.data.data));
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
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
        <div className="flex flex-col md:flex-row md:justify-evenly w-full gap-10">
          <div className=" w-3/5 md:w-2/5 lg:w-1/3 flex flex-row bg-nav-white h-[120px] rounded-lg p-4 gap-2">
            <div className="flex justify-center self-center w-1/3">
              <img width="80" height="80" src={Man} alt="user" />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-semibold text-nav-color text-base sm:text-xl">
                {fullname}
              </h1>
              <p className="text-black-heading text-xs sm:text-sm italic">
                {data.email}
              </p>
              <p
                className="text-nav-color font-semibold cursor-pointer text-xs sm:text-sm italic"
                onClick={() => navigate("/changePassword")}
              >
                Change Password
              </p>
              {!isAdmin && (
                <p
                  className="text-logout-color text-xs sm:text-sm cursor-pointer italic font-medium"
                  onClick={makeaSeller}
                >
                  Become a Seller
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-5 w-full md:w-3/4 xl:w-2/3">
            { error && <p className="flex flex-col w-full xl:w-4/5 justify-center bg-nav-white rounded-lg p-3">
              {error && (
                <span className="text-logout-color text-base text-center tracking-wide font-medium">
                  {error}
                </span>
              )}
            </p>}
            <div className="flex flex-col w-full xl:w-4/5 justify-center bg-nav-white rounded-lg p-8 pb-4">
              <div className="w-full flex flex-row">
                <div className="flex flex-col w-1/2 gap-3">
                  <h1 className="text-xs sm:text-sm text-heading-color font-semibold">
                    LOGIN INFORMATION
                  </h1>
                  <div className="flex flex-col p-3 gap-2">
                    <div className="flex flex-col pb-3 gap-1">
                      <p className="text-xs sm:text-sm font-medium text-button-color">
                        EMAIL
                      </p>
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
                        <p className="text-sm font-medium text-heading-color border-b border-text-heading">
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
                        <p className="text-sm font-medium text-heading-color border-b border-text-heading">
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
                        <p className="text-sm font-medium text-heading-color border-b border-text-heading">
                          {capitalizeName(data.fullname)}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col pb-3 gap-1">
                      <p className="text-xs sm:text-sm font-medium text-button-color">
                        GENDER
                      </p>
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
                        <p className="text-sm font-medium text-heading-color border-b border-text-heading">
                          {capitalizeName(data.gender)}
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
            <div className="flex flex-col  w-full xl:w-4/5 justify-center bg-nav-white rounded-lg p-8 pb-4">
              <div className="w-full flex flex-row">
                <div className="flex flex-col w-1/2 gap-3">
                  <h1 className=" text-xs sm:text-sm text-heading-color font-semibold">
                    ADDRESS INFORMATION{" "}
                  </h1>
                  <div className="flex flex-col p-3 gap-2">
                    <div className="flex flex-col pb-3 gap-1">
                      <p className="text-xs sm:text-sm font-medium text-button-color">
                        ADDRESS
                      </p>
                      {editAbleLocationUser ? (
                        <Input
                          type="text"
                          name="address"
                          value={dataLocation.address}
                          placeholder="Address"
                          className="text-xs sm:text-sm font-medium text-heading-color border-b border-text-heading"
                          onChange={handleChange2}
                        />
                      ) : (
                        <p className="text-xs sm:text-sm font-medium text-heading-color border-b border-text-heading">
                          {dataLocation.address}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col pb-3 gap-1">
                      <p className="text-xs sm:text-sm font-medium text-button-color">
                        CITY
                      </p>
                      {editAbleLocationUser ? (
                        <Input
                          type="text"
                          name="city"
                          value={dataLocation.city}
                          placeholder="City"
                          className="text-xs sm:text-sm font-medium text-heading-color border-b border-text-heading"
                          onChange={handleChange2}
                        />
                      ) : (
                        <p className="text-xs sm:text-sm font-medium text-heading-color border-b border-text-heading">
                          {capitalizeName(dataLocation.city)}
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
                          onChange={handleChange2}
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
                          onChange={handleChange2}
                        />
                      ) : (
                        <p className="text-xs sm:text-sm font-medium text-heading-color border-b border-text-heading">
                          {capitalizeName(dataLocation.district)}
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
                    editAbleLocationUser
                      ? saveButtonLocationHandler
                      : () => setEditAbleLocationUser(true)
                  }
                >
                  <MdModeEdit className="flex justify-center self-center" />
                  {editAbleLocationUser ? "Save Details" : "Edit Info"}
                </Button>
              </div>
            </div>
          </div>
        </div>
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
