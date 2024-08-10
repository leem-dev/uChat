import React, { useEffect, useState } from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import AvatarGenerator from "../utils/AvatarGenerator";
import { toastError, toastWarn } from "../utils/toast";
import { BE_saveProfile } from "../Backend/Queries";

function ProfilePage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [avatar, setAvatar] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [deleteAccLoading, setDeleteAccLoading] = useState(false);

  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setEmail(currentUser.email);
    setUsername(currentUser.username);
  }, [currentUser]);

  const handleProfileAvatar = () => {
    setAvatar(AvatarGenerator());
  };

  const handleSaveProfile = async () => {
    // check if the email and username is not empty
    if (!email || !username) toastError("Email or username cant be empty!");

    // if password is true, confirm password is true
    let temp_password = password;
    if (temp_password && temp_password !== confirmPass) {
      toastError("Passwords must match");
      temp_password = "";
    }

    // only update email when change occurs
    let temp_mail = email;
    if (temp_mail === currentUser.email) temp_mail = "";

    // only update username when change is made
    let temp_user = username;
    if (temp_user === currentUser.username) temp_user = "";

    // only update avatar when change is made
    let temp_avatar = avatar;
    if (temp_avatar === currentUser.img) temp_avatar = "";

    if (temp_mail || temp_avatar || temp_user || temp_password) {
      await BE_saveProfile(
        dispatch,
        {
          email: temp_mail,
          username: temp_user,
          password: temp_password,
          img: temp_avatar,
        },
        setProfileLoading
      );
    } else toastWarn("Change details before saving!");
  };

  return (
    <div className="bg-white flex flex-col gap-5 shadow-md max-w-2xl rounded-xl py-5 px-6 md:p-10 md:m-auto m-5 md:mt-10">
      <div className="relative self-center" onClick={handleProfileAvatar}>
        <img
          src={avatar || currentUser.img}
          alt={currentUser.username}
          className="w-32 h-32 md:w-48 md:h-48 rounded-full p-[2px] ring-gray-300 cursor-pointer hover:shadow-lg"
        />
        <span className="absolute top-7 md:top-7 left-28 md:left-40 w-5 h-5 border-2 border-gray-800 rounded-full bg-green-400"></span>
      </div>
      <p className="text-gray-400 text-sm text-center">
        Note: Click on image to temporary change it, when you like it, then save
        profile. You can leave password and username as they are if you don't
        want to change them
      </p>
      <div className="flex flex-col gap-2">
        <Input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
        />
        <Input
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value.trim())}
        />
        <Input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          name="confirmPassword"
          type="password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
        />
        <Button text="Update Profile" onClick={handleSaveProfile} />
        <Button text="Delete Account" secondary />
      </div>
    </div>
  );
}

export default ProfilePage;
