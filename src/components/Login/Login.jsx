import React, { useState } from "react";
import { Logo, Input, Button } from "../index";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { login as authLogin } from "../../store/auth/authSlice.js";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth.js";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [data, setData] = useState({ email: "", password: "" });

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setError("");
    if (data.email === "" || data.password === "")
      return setError("Please fill all the fields");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        localStorage.setItem("userData", JSON.stringify(userData.data.data));
        dispatch(authLogin(userData.data.data));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-nav-color mt-10  w-4/5 md:w-2/3 rounded-xl justify-center md:m-10 text-center self-center border-t-2 border-text-green">
      <div className=" w-full h-full pt-10 md:w-1/2 flex flex-col justify-center gap-2 md:gap-7 md:m-5">
        <Logo width="200px" height="200px" />
        <h1 className="text-text-green mt-2  md:text-4xl sm:text-3xl font-bold tracking-widest">
          Aoushadhi
        </h1>
      </div>
      <div className="border border-nav-white mt-2 mb-2"></div>
      <div className=" w-4/5 h-full m-auto mt-10 md:w-1/2 flex flex-col justify-evenly gap-7 md:m-5">
        <h2 className="text-nav-white mt-1 sm:mt-2 text-2xl md:text-2xl sm:text-2xl font-bold tracking-widest">
          LOGIN{" "}
          <p>
            {error && (
              <span className="text-logout-color text-xs tracking-wide font-medium">
                {error}
              </span>
            )}
          </p>
        </h2>
        <form onSubmit={handleLogin} className="p-2 flex flex-col gap-3">
          <Input
            type="email"
            placeholder="Email"
            onChange={(e) =>
              setData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <Input
            type="password"
            name="password"
            onChange={(e) =>
              setData((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder="Password"
          />
          <Button
            type="submit"
            className="rounded-xl transition-transform duration-400 ease-out hover:ease-in transform hover:scale-110 bg-button-color hover:bg-text-green text-nav-white outline-none focus:bg-gray-50 duration-200 w-full"
          >
            Submit
          </Button>
        </form>
        <div className="flex justify-evenly gap-2">
          <Link
            to="/signup"
            className="flex justify-evenly text-sm transition-transform duration-400 ease-out hover:ease-in transform hover:scale-110 text-nav-active hover:text-nav-white"
          >
            Create a new Account ?
          </Link>
          <Link
            to="/"
            className="flex justify-evenly text-sm transition-transform duration-400 ease-out hover:ease-in transform hover:scale-110 text-nav-active hover:text-nav-white"
          >
            Forgot Password ?
          </Link>
        </div>
        <hr className="border-nav-white" />
        <Button className="p-4 rounded-full bg-nav-white font-semibold text-nav-color text-sm">
          Sign In By Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
