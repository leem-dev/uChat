import React from "react";

type Props = {};

function ChatArea({}: Props) {
  return (
    <div className="flex-1 lg:flex-[0.4] max-h-full flex flex-col px-2 md:px-5 gap-2 border-2 border-black">
      <div className="flex-1 "></div>

      <div className="flex gap-1 md:gap-5">
        <div className="bg-white p-[2px] flex-1 rounded-full shadow-md flex items-center gap-2 border-2 border-gray-300"></div>
      </div>
    </div>
  );
}

export default ChatArea;
