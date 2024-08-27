import React, { useEffect, useState } from "react";
import { chatType, userType } from "../Types";
import { getUserInfo } from "../Backend/Queries";
import { toastError } from "../utils/toast";
import UserHeaderProfile from "./UserHeaderProfile";

type ChatsProfileType = {
  userId?: string;
  chat: chatType;
};

function ChatsProfile({ userId, chat }: ChatsProfileType) {
  const [userLoading, setUserLoading] = useState(false);
  const [user, setUser] = useState<userType>();

  useEffect(() => {
    const getUser = async () => {
      if (userId) {
        const usr = await getUserInfo(userId, setUserLoading);
        setUser(usr);
      } else toastError("ChatsProfie");
    };
    getUser();
  }, [userId]);

  const handleSelectedChat = () => {};

  return <UserHeaderProfile handleClick={handleSelectedChat} />;
}

export default ChatsProfile;
