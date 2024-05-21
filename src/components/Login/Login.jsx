import React from "react";
import { Logo, Input, Button } from "../index";

const Login = () => {
  return (
    <div className="flex bg-nav-color mt-20 h-3/5 w-2/3 rounded-xl justify-center m-10 text-center border-t-2 border-text-green">
      <div className="w-1/2 flex flex-col justify-center gap-7 m-5">
        <Logo width="200px" height="200px" />
        <h1 className="text-text-green mt-2 text-4xl md:text-3xl sm:text-2xl font-bold tracking-widest">
          Aoushadhi
        </h1>
      </div>
      <div className="border border-nav-white mt-2 mb-2"></div>
      <div className="w-1/2 flex flex-col justify-evenly gap-7 m-5">
        <h2 className="text-nav-white mt-2 text-4xl md:text-3xl sm:text-2xl font-bold tracking-widest">
          LOGIN
        </h2>
        <div className="p-2 flex flex-col gap-3">
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button className="rounded-xl transition-transform duration-400 ease-out hover:ease-in transform hover:scale-110 bg-button-color hover:bg-text-green text-nav-white outline-none focus:bg-gray-50 duration-200 w-full">
            Submit
          </Button>
        </div>
        <div className="flex justify-evenly">
          <TextLink text="Create a new Account ?" />
          <TextLink text="Forgot Password ?" />
        </div>
        <hr className="border-nav-white" />
        <Button className="p-4 rounded-full bg-nav-white font-semibold text-nav-color text-sm">
          Sign In By Google
        </Button>
      </div>
    </div>
  );
};

const TextLink = ({ text }) => (
  <p className="flex justify-evenly text-sm transition-transform duration-400 ease-out hover:ease-in transform hover:scale-110 text-nav-active hover:text-nav-white">
    {text}
  </p>
);

export default Login;
