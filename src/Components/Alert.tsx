import React from "react";
import Button from "./Button";

function Alert() {
  return (
    <div className={`fixed top-0 z-50 h-full w-full block`}>
      <div className="flex items-center justify-center w-full h-full">
        <div className="bg-white border-8 min-w-[90%] md:min-w-[500px] rounded-[30px] z-30 p-10 flex flex-col">
          <div className="flex-1 mb-5">
            <p className="">Start chatting with user?</p>
          </div>
          <div className="flex justify-end gap-5">
            <Button text="Cancel" secondary />
            <Button text="Sure" />
          </div>
        </div>
        <div className="absolute z-20 w-full h-full bg-black bg-opacity-30 backdrop-blur-[2px]"></div>
      </div>
    </div>
  );
}

export default Alert;
