import React, { useEffect, useState } from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import AvatarGenerator from "../utils/AvatarGenerator";
import { toastError, toastWarn } from "../utils/toast";
import { BE_deleteProfile, BE_saveProfile } from "../Backend/Queries";
import { useNavigate } from "react-router-dom";
import Avatar from "../Components/Avatar";

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
  const goTo = useNavigate();

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

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        `Are you sure to delete ${username}? This can't be reversed`
      )
    ) {
      await BE_deleteProfile(dispatch, goTo, setDeleteAccLoading);
    }
  };

  return (
    <div className="flex flex-col max-w-2xl gap-5 px-6 py-5 m-5 bg-white shadow-md rounded-xl md:p-10 md:m-auto md:mt-10">
      <Avatar
        avatar={avatar}
        currentUser={currentUser}
        handleOnClick={handleProfileAvatar}
        isOnline
      />
      <p className="text-sm text-center text-gray-400">
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
        <Button
          text="Update Profile"
          onClick={handleSaveProfile}
          loading={profileLoading}
        />
        <Button
          text="Delete Account"
          onClick={handleDeleteAccount}
          loading={deleteAccLoading}
          secondary
        />
      </div>
    </div>
  );
}

export default ProfilePage;
