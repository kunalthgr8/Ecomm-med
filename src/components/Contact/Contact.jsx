import React from "react";
import { Input, Button } from "../index";
function Contact() {
  return (
    <>
      <div className="flex flex-col m-10 h-full gap-5">
        <div>
          <h1 className=" text-heading-color mt-2 text-4xl md:text-3xl sm:text-2xl font-bold ">
            Get In Touch
          </h1>
        </div>
        <div className="w-2/3 flex flex-col justify-center self-center ">
          <div className="p-5 border-2 rounded-3xl  border-nav-color bg-nav-white">
            <h1 className="text-nav-color mt-2 text-2xl md:text-2xl sm:text-2xl font-bold">
              Feedback
            </h1>
            <div className="p-4 mt-5 flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Purpose Of Contact"
                className=" border-nav-color"
                label="Purpose of contact"
              />
              <Input
                type="text"
                placeholder="Write your message"
                className=" border-nav-color h-20"
                label="write your message"
              />
              <Button className="bg-text-green text-nav-white rounded-lg transition-transform duration-400 ease-out hover:ease-in transform hover:scale-110">
                {" "}
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
