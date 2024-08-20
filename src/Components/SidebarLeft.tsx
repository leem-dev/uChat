import React from "react";
import Sidebar from "./Sidebar";

type Props = {};

function SidebarLeft({}: Props) {
  return (
    <Sidebar className={`flex-[0.8] w-[80%] h-[80%] md:h-full md:w-full`}>
      <div className="flex flex-col">
        <div className="sticky top-0 z-10 flex">
          <p className={`p-5 flex-1 text-center font-bold cursor-pointer`}>
            Chats
          </p>
          <p className={`p-5 flex-1 text-center font-bold cursor-pointer`}>
            Users
          </p>
        </div>
      </div>
    </Sidebar>
  );
}

export default SidebarLeft;
