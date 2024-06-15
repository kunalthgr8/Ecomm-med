import React from "react";
import { Advertise, HomeCard } from "..";
import { useSelector } from "react-redux";
import  {AdminDashboard} from "../index";
function Home() {
  const { userData } = useSelector((state) => state.auth);
  const userRole = userData?.role === "admin" || false;
  return (
    <>
      {!userRole && (
        <div className="flex flex-col w-full h-full mt-10 ">
          <div className="w-full">
            <Advertise />
          </div>
          <div className="m-10">
            <HomeCard />
          </div>
        </div>
      )}
      {userRole && <div className="flex flex-col w-full h-full mt-10 "><AdminDashboard/></div>}
    </>
  );
}

export default Home;
