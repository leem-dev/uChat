import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import Sidebar from "./Sidebar";
import Avatar from "./Avatar";

function SidebarRight() {
  const currentSelectedChat = useSelector(
    (state: RootState) => state.chat.currentSelectedChat
  );

  const { id, email, isOnline, username, bio, lastSeen, creationTime } =
    currentSelectedChat;
  return (
    <Sidebar isRight className="hidden lg:block">
      <div className="flex flex-col">
        <div className="sticky top-0 flex items-center justify-center h-16 bg-gray-200">
          {username && <p className="text-xl font-bold">{username}</p>}
        </div>
        {id ? (
          <div className="flex flex-col gap-10 p-10">
            <Avatar
              currentUser={currentSelectedChat}
              handleOnClick={() => null}
              isOnline={isOnline}
            />
            <div className="flex flex-col gap-2">
              <p className="text-gray-400">
                Username: <span className="text-gray-900">{username}</span>
              </p>
              <hr />
              <p className="text-gray-400">
                Email: <span className="text-gray-900">{email}</span>
              </p>
              <p className="text-gray-400">
                Joined In: <span className="text-gray-900">{creationTime}</span>
              </p>
              <p className="text-gray-400">
                Last Seen: <span className="text-gray-900">{lastSeen}</span>
              </p>
              <p className="text-gray-400">
                Bio: <span className="text-gray-900">{bio}</span>
              </p>
            </div>
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
