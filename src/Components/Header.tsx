import React from "react";

import AddListBoard from "./AddListBoard";
const uChat = require("../Assets/chat.png");

type Props = {};

function Header() {
  return (
    <div className="flex flex-wrap sm:flex-row gap-5 items-center justify-between drop-shadow-md bg-gradient-to-r from-myBlue to-myPink px-5 py-5 md:py-2 text-white">
      <img
        className="w-[70px] drop-shadow-md cursor-pointer"
        src={uChat}
        alt="img"
      />
      <div className="flex">
        <AddListBoard />
      </div>
    </div>
  );
}

export default Header;
