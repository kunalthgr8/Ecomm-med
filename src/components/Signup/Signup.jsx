import React from "react";
import { Logo, Input, Button } from "../index";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth/authSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = React.useState("");

  const create = async (e) => {
    e.preventDefault();
    setError("");
    if (data.username === "" || data.email === "" || data.password === "")
      return setError("Please fill all the fields");
    try {
      const user = await authService.createAccount(data);
      if (user) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          localStorage.setItem("userData", JSON.stringify(userData.data.data));
          dispatch(login(userData.data.data));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex bg-nav-color mt-20 h-4/5 w-2/3 rounded-xl justify-center m-10 text-center self-center border-t-2 border-text-green">
      <div className="w-1/2 flex flex-col justify-center gap-7 m-5">
        <Logo width="200px" height="200px" />
        <h1 className="text-text-green mt-2 text-4xl md:text-3xl sm:text-2xl font-bold tracking-widest">
          Aoushadhi
        </h1>
      </div>
      <div className="border border-nav-white mt-2 mb-2"></div>
      <div className="w-1/2 flex flex-col justify-evenly gap-7 m-5 mt-1">
        <h2 className="text-nav-white text-4xl md:text-3xl sm:text-2xl font-bold tracking-widest">
          Sign Up {error && <span className="text-red-500">{error}</span>}
        </h2>
        <form onSubmit={create} className="p-2 flex flex-col gap-3 pt-0 pb-0">
          <Input
            type="text"
            placeholder="Username"
            onChange={(e) =>
              setData((prev) => ({ ...prev, username: e.target.value }))
            }
          />
          <Input
            type="email"
            placeholder="Email"
            onChange={(e) =>
              setData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <Button
            type="submit"
            className="rounded-xl transition-transform duration-400 ease-out hover:ease-in transform hover:scale-110 bg-button-color hover:bg-text-green text-nav-white outline-none focus:bg-gray-50 duration-200 w-full"
          >
            Submit
          </Button>
        </form>
        <div className="flex p-2 pt-0 pb-0">
          <Link
            to="/login"
            className="flex justify-start text-left text-sm transition-transform duration-400 ease-out hover:ease-in transform hover:scale-110 text-nav-active hover:text-nav-white"
          >
            Already Have a Account ?
          </Link>
        </div>
        <hr className="border-nav-white" />
        <Button className="p-4 rounded-full bg-nav-white font-semibold text-nav-color text-sm">
          Sign Up By Google
        </Button>
      </div>
    </div>
  );
};

export default Signup;
