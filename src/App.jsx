import "./App.css";
import React from "react";
import { Header, SideBar } from "./components";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./store/auth/authSlice.js";

function App() {
  const authStatus = false;
  const dispatch = useDispatch();
  React.useEffect(() => {
    const storedAuthData = localStorage.getItem("userData");
    if (storedAuthData) {
      dispatch(login(JSON.parse(storedAuthData)));
    }
  }, [dispatch]);

  document.body.style.overflow = "hidden";
  return (
    <div className="flex h-screen">
      <div className="w-1/6 md:w-1/5 sm:w-1/4 h-full">
        <SideBar />
      </div>
      <div className=" flex flex-col bg-back-color w-5/6 md:w-4/5 sm:w-3/4 h-full flex-grow overflow-y-auto">
        <Header />
        <div className="h-full flex justify-center ">
        <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
