import React from "react";
import { userType } from "../Types";

type AvatarProps = {
  avatar?: string;
  currentUser: userType;
  handleOnClick: () => void;
};

function Avatar({ avatar, currentUser, handleOnClick }: AvatarProps) {
  return (
    <div className="relative self-center" onClick={handleOnClick}>
      <img
        src={avatar || currentUser.img}
        alt={currentUser.username}
        className="w-32 h-32 md:w-48 md:h-48 rounded-full p-[2px] ring-gray-300 cursor-pointer hover:shadow-lg"
      />
      <span className="absolute w-5 h-5 bg-green-400 border-2 border-gray-800 rounded-full top-7 md:top-7 left-28 md:left-40"></span>
    </div>
  );
}

export default Avatar;
