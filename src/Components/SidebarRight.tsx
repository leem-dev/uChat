import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import Sidebar from "./Sidebar";
import Avatar from "./Avatar";

function SidebarRight() {
  const currentSelectedChat = useSelector(
    (state: RootState) => state.chat.currentSelectedChat
  );
  return (
    <Sidebar isRight>
      <div className="flex flex-col">
        <div className="sticky top-0 flex items-center justify-center h-16 bg-gray-200">
          {currentSelectedChat.username && (
            <p className="text-xl font-bold">{currentSelectedChat.username}</p>
          )}
        </div>
        {currentSelectedChat.id ? (
          <div className="flex flex-col p-10">
            <Avatar
              currentUser={currentSelectedChat}
              handleOnClick={() => null}
            />
          </div>
        ) : (
          <div className="p-10">
            No chat selected yet, select a chat to see user details
          </div>
        )}
      </div>
    </Sidebar>
  );
}

export default SidebarRight;
