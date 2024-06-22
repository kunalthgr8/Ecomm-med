import "./App.css";
import React, { useEffect, useState } from "react";
import { Header, SideBar } from "./components";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./store/auth/authSlice.js";
import HeaderSideBar from "./components/Header/HeaderSidebar.jsx";

function App() {
  const dispatch = useDispatch();

  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);

  useEffect(() => {
    const storedAuthData = localStorage.getItem("userData");
    if (storedAuthData) {
      const parsedAuthData = JSON.parse(storedAuthData);
      dispatch(login(parsedAuthData));
    }
  }, [dispatch]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // Clean up on unmount
    };
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-1/6 md:w-1/5 sm:w-1/4 h-full hidden lg:block">
        <SideBar />
      </div>
      <div className="lg:hidden">{isSidebarOpen && <HeaderSideBar />}</div>
      <div className="flex flex-col bg-back-color w-5/6 md:w-4/5 sm:w-3/4 h-full flex-grow overflow-y-auto">
        <Header />
        <div className=" flex justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
