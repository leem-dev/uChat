import React, { useState } from "react";
import Icon from "./Icon";
import {
  BsFillSendFill,
  BsFillCameraFill,
  BsFillEmojiSunglassesFill,
  BsFillPeopleFill,
} from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import Input from "./Input";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

type Props = {};

function ChatArea({}: Props) {
  const [msg, setMsg] = useState("");

  const currentSelectedChat = useSelector(
    (state: RootState) => state.chat.currentSelectedChat
  );

  return (
    <div className="flex-1 lg:flex-[0.4] max-h-full flex flex-col px-2 md:px-5 gap-2 ">
      <div className="flex-1 border-2 border-black">Chat Messages</div>

      <div className="flex gap-1 md:gap-5">
        <div className="bg-white p-[2px] flex-1 rounded-full shadow-md flex items-center gap-2 border-2 border-gray-300">
          <Icon
            IconName={BsFillPeopleFill}
            className="block text-gray-500 md:hidden"
            reduceOpacityOnHover={false}
            size={15}
          />
          <Icon
            IconName={BsFillEmojiSunglassesFill}
            className="hidden text-gray-500 md:block"
            size={15}
          />
          <Input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            name={`Enter message to ${currentSelectedChat?.username}`}
            className="border-none outline-none text-sm md:text-[15px]"
          />
          <Icon
            IconName={ImAttachment}
            className="hidden text-gray-500 rotate-90 md:block"
          />
          <Icon
            IconName={BsFillCameraFill}
            className="hidden text-gray-500 md:block"
          />
        </div>

        <div className="flex items-center justify-center">
          <Icon IconName={BsFillSendFill} reduceOpacityOnHover={false} />
        </div>
      </div>
    </div>
  );
}

export default ChatArea;
