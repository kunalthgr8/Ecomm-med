import React from "react";
import { Advertise, HomeCard } from "..";

function Home() {
  return (
    <>
      <div className="flex flex-col w-full h-full mt-10 ">
        <div className="w-full">
          <Advertise />
        </div>
        <div className="m-10">
          <HomeCard />
        </div>
      </div>
    </>
  );
}

export default Home;
