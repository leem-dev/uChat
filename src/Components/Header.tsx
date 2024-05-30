import React from "react";
import { BsFillChatFill } from "react-icons/bs";
import { FiList } from "react-icons/fi";
import AddListBoard from "./AddListBoard";
import Icon from "./Icon";
import UserHeaderProfile from "./UserHeaderProfile";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { Link } from "react-router-dom";

const uChat = require("../Assets/chat.png");

type Props = {};

function Header() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  return (
    <div className="flex flex-wrap sm:flex-row gap-5 items-center justify-between drop-shadow-md bg-gradient-to-r from-myBlue to-myPink px-5 py-5 md:py-2 text-white">
      <img
        className="w-[70px] drop-shadow-md cursor-pointer"
        src={uChat}
        alt="img"
      />
      <div className="flex flex-row-reverse md:flex-row items-center justify-center gap-5 flex-wrap">
        <AddListBoard />
        <Icon IconName={BsFillChatFill} ping={true} />
        <Icon IconName={FiList} />
        <div className="group relative">
          <UserHeaderProfile user={currentUser} />
          <div className="absolute pt-5 hidden group-hover:block w-full min-w-max">
            <ul className="w-full bg-white overflow-hidden rounded-md shadow-md text-gray-700 pt-1">
              <Link
                to="/dashboard/profile"
                className="hover:bg-gray-200 py-2 px-4 block"
              >
                Profile
              </Link>
              <Link to="/auth" className="hover:bg-gray-200 py-2 px-4 block">
                Logout
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
