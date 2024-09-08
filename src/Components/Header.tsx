import React, { useEffect, useState } from "react";
import { BsFillChatFill } from "react-icons/bs";
import { FiList } from "react-icons/fi";
import AddListBoard from "./AddListBoard";
import Icon from "./Icon";
import UserHeaderProfile from "./UserHeaderProfile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { useNavigate } from "react-router-dom";
import { BE_getChats, BE_signOut, getStorageUser } from "../Backend/Queries";
import Spinner from "./Spinner";
import { setUser } from "../Redux/userSlice";

const uChat = require("../Assets/chat.png");

type Props = {};

function Header() {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const goTo = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const hasNewMessage = useSelector(
    (state: RootState) => state.chat.hasNewMessages
  );

  const userDetails = getStorageUser();

  useEffect(() => {
    if (userDetails?.id) {
      dispatch(setUser(userDetails));
    } else {
      goTo("/auth");
    }
  }, [dispatch, goTo]);

  useEffect(() => {
    const page = getCurrentPage();
    if (page) goTo("/dashboard/" + page);

    const get = async () => {
      if (userDetails?.id) await BE_getChats(dispatch);
    };
    get();
  }, [goTo]);

  const handleGoToPage = (page: string) => {
    goTo("/dashboard/" + page);
    setCurrentPage(page);
  };

  const handleSignOut = () => {
    BE_signOut(dispatch, goTo, setLogoutLoading);
  };

  const setCurrentPage = (page: string) => {
    localStorage.setItem("new-UserPage", page);
  };

  const getCurrentPage = () => {
    return localStorage.getItem("new-UserPage");
  };

  return (
    <div className="z-10 flex flex-wrap items-center justify-between gap-5 px-5 py-5 text-white sm:flex-row drop-shadow-md bg-gradient-to-r from-myBlue to-myPink md:py-2">
      <img
        className="w-[70px] drop-shadow-md cursor-pointer"
        src={uChat}
        alt="img"
      />
      <div className="flex flex-row-reverse flex-wrap items-center justify-center gap-5 md:flex-row">
        {getCurrentPage() === "chat" ? (
          <Icon
            IconName={FiList}
            onClick={() => handleGoToPage("")}
            reduceOpacityOnHover={false}
          />
        ) : getCurrentPage() === "profile" ? (
          <>
            <Icon
              IconName={FiList}
              onClick={() => handleGoToPage("")}
              reduceOpacityOnHover={false}
            />

            <Icon
              IconName={BsFillChatFill}
              ping={hasNewMessage}
              onClick={() => handleGoToPage("chat")}
              reduceOpacityOnHover={false}
            />
          </>
        ) : (
          <>
            <AddListBoard />
            <Icon
              IconName={BsFillChatFill}
              ping={hasNewMessage}
              onClick={() => handleGoToPage("chat")}
              reduceOpacityOnHover={false}
            />
          </>
        )}

        <div className="relative group">
          <UserHeaderProfile user={currentUser} />
          <div className="absolute hidden w-full pt-5 group-hover:block min-w-max">
            <ul className="w-full pt-1 overflow-hidden text-gray-700 bg-white rounded-md shadow-md">
              <p
                onClick={() => handleGoToPage("profile")}
                className="block px-4 py-2 cursor-pointer hover:bg-gray-200"
              >
                Profile
              </p>
              <button
                onClick={() => !logoutLoading && handleSignOut()}
                className={`hover:bg-gray-200 w-full py-2 px-4 cursor-pointer flex items-center gap-4 ${
                  logoutLoading && "cursor-wait"
                }`}
              >
                Logout
                {logoutLoading && <Spinner />}
              </button>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
