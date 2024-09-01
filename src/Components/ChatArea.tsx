import React, { useEffect, useState } from "react";
import Icon from "./Icon";
import {
  BsFillSendFill,
  BsFillCameraFill,
  BsFillEmojiSunglassesFill,
  BsFillPeopleFill,
} from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { setRightSidebarOpen } from "../Redux/chatsSlice";
import { BE_getMsgs, getStorageUser } from "../Backend/Queries";
import { MessagesLoader } from "./Loaders";

type Props = {};

function ChatArea({}: Props) {
  const [msg, setMsg] = useState("");
  const [getMsgsLoading, setGetMsgsLoading] = useState(false);
  const [createMsgLoading, setCreateMsgLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const currentSelectedChat = useSelector(
    (state: RootState) => state.chat.currentSelectedChat
  );
  const messages = useSelector(
    (state: RootState) => state.chat.currentMessages
  );

  useEffect(() => {
    const chatId = currentSelectedChat.chatId;

    const get = async () => {
      if (chatId) await BE_getMsgs(dispatch, chatId, setGetMsgsLoading);
    };
    get();
  }, [currentSelectedChat.id]);

  return (
    <div className="flex-1 lg:flex-[0.4] max-h-full flex flex-col px-2 md:px-5 gap-2 ">
      {getMsgsLoading ? (
        <MessagesLoader />
      ) : (
        <div className="flex flex-col flex-1 max-h-screen gap-2 overflow-y-scroll shadow-inner">
          <FlipMove>
            {messages.map((msg) => {
              const myId = getStorageUser().id;
              if (msg.senderId === myId) {
                return (
                  <div className="self-end max-w-md px-10 py-3 text-xs text-white border-2 border-white rounded-t-full rounded-bl-full shadow-md bg-gradient-to-r from-myBlue to-myPink ">
                    {msg.content}
                  </div>
                );
              }
            })}
          </FlipMove>

          <div className="self-start max-w-md px-10 py-3 text-xs text-black bg-gray-300 border-2 border-white rounded-t-full rounded-br-full shadow-md">
            Hi there! can you hear me
          </div>
        </div>
      )}

      <div className="flex gap-1 md:gap-5">
        <div className="bg-white p-[2px] flex-1 rounded-full shadow-md flex items-center gap-2 border-2 border-gray-300">
          <Icon
            IconName={BsFillPeopleFill}
            className="block text-gray-500 md:hidden"
            reduceOpacityOnHover={false}
            size={15}
            onClick={() => dispatch(setRightSidebarOpen())}
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
