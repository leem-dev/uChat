import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { setIsChatsTab } from "../Redux/chatsSlice";
import Chats from "./Chats";
import Users from "./Users";
import { BE_getAllUsers } from "../Backend/Queries";

type Props = {};

function SidebarLeft({}: Props) {
  const [usersLoading, setUsersLoading] = useState(false);
  const isChatsTab = useSelector((state: RootState) => state.chat.isChatsTab);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const get = async () => {
      await BE_getAllUsers(dispatch, setUsersLoading);
    };

    get();
  }, []);

  return (
    <Sidebar className={`flex-[0.8] w-[80%] h-[80%] md:h-full md:w-full`}>
      <div className="flex flex-col">
        <div className="sticky top-0 z-10 flex">
          <p
            onClick={() => dispatch(setIsChatsTab(true))}
            className={`p-5 flex-1 text-center font-bold cursor-pointer ${
              isChatsTab
                ? `bg-gradient-to-r from-myBlue to-myPink text-white`
                : `bg-gray-200 text-gray-900`
            }`}
          >
            Chats
          </p>
          <p
            onClick={() => dispatch(setIsChatsTab(false))}
            className={`p-5 flex-1 text-center font-bold cursor-pointer  ${
              !isChatsTab
                ? `bg-gradient-to-r from-myBlue to-myPink text-white`
                : `bg-gray-200 text-gray-900`
            }`}
          >
            Users
          </p>
        </div>
        <div className="flex flex-col flex-1 max-h-full py-2 overflow-scroll">
          {isChatsTab ? <Chats /> : <Users loading={usersLoading} />}
        </div>
      </div>
    </Sidebar>
  );
}

export default SidebarLeft;
