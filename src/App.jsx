import "./App.css";
import React from "react";
import { SideBar } from "./components";
import { Outlet } from "react-router-dom";

function App() {

  const authStatus = false;
  return (
    <div className="flex h-screen">
      <div className="w-1/6 md:w-1/5 sm:w-1/4 h-full">
        <SideBar />
      </div>
      <div className="w-5/6 md:w-4/5 sm:w-3/4 h-full">
        <div className="flex bg-nav-active w-full h-full justify-center ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
