import React from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";

function ProfilePage() {
  return (
    <div className="bg-white flex flex-col gap-5 shadow-md max-w-2xl rounded-xl py-5 px-6 md:p-10 md:m-auto m-5 md:mt-10">
      <div className="relative self-center">
        <img
          src="https://api.multiavatar.com/test.png"
          alt=""
          className="w-32 h-32 md:w-48 md:h-48 rounded-full p-[2px] ring-gray-300 cursor-pointer hover:shadow-lg"
        />
        <span className="absolute top-7 md:top-7 left-28 md:left-40 w-5 h-5 border-2 border-gray-800 rounded-full bg-green-400"></span>
      </div>
      <p className="text gray 400 text-sm text-center">
        Note: Click on image to temporary change it, when you like it, then save
        profile. You can leave password and username as they are if you don't
        want to change them
      </p>
      <div className="flex flex-col gap-2">
        <Input name="email" />
        <Input name="email" />
        <Input name="email" />
        <Input name="email" />
        <Button text="Update Profile" />
        <Button text="Delete Account" secondary />
      </div>
    </div>
  );
}

export default ProfilePage;
