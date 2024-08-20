import React from "react";
import SidebarLeft from "../Components/SidebarLeft";
const nochat = require("../Assets/nochat.jpg");

type Props = {};

function ChatPage({}: Props) {
  return (
    <div className="h-full max-w-[1500px] flex justify-between m-auto p-3">
      <SidebarLeft />
      <div className="hidden lg:block flex-[0.7] bg-white rounded-r-3xl shadow-md overflow-hidden">
        <img
          src={nochat}
          alt="nochat jpg"
          className="object-contain w-full h-full"
        />
      </div>
    </div>
  );
}

export default ChatPage;
