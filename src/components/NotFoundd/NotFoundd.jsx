// src/components/NotFound.jsx
import React from "react";
import Error4 from "../../assets/Error4.svg";

const NotFoundd = () => {
  return (
    // <div>
    //   <img src={Error4} alt="Error" />
    //   <h1>Something went wrong</h1>
    //   <p>The page you are looking for does not exist.</p>
    // </div>
    <div className="flex flex-col items-center w-5/6 mt-10 h-full justify-center self-center">
      <img src={Error4} alt="No Page found" width="300px" />
      <h1 className="text-xl text-black-heading font-bold tracking-widest m-3">
        The page you are looking for does not exist.
      </h1>
    </div>
  );
};

export default NotFoundd;
