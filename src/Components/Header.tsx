import React, { useState } from "react";
import { BsFillChatFill } from "react-icons/bs";
import { FiList } from "react-icons/fi";
import AddListBoard from "./AddListBoard";
import Icon from "./Icon";
import UserHeaderProfile from "./UserHeaderProfile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { Link, useNavigate } from "react-router-dom";
import { BE_signOut } from "../Backend/Queries";
import Spinner from "./Spinner";

const uChat = require("../Assets/chat.png");

type Props = {};

function Header() {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const goTo = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const handleSignOut = () => {
    BE_signOut(dispatch, goTo, setLogoutLoading);
  };
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
              <p
                onClick={() => !logoutLoading && handleSignOut()}
                className={`hover:bg-gray-200 py-2 px-4 cursor-pointer flex items-center gap-4 ${
                  logoutLoading && "cursor-wait"
                }`}
              >
                Logout
                {logoutLoading && <Spinner />}
              </p>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
