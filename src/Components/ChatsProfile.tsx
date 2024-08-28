import React, { useEffect, useState } from "react";
import { chatType, userType } from "../Types";
import { getUserInfo, iCreatedChat } from "../Backend/Queries";
import { toastError } from "../utils/toast";
import UserHeaderProfile from "./UserHeaderProfile";
import { defaultUser } from "../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { setCurrentSelectedChat } from "../Redux/chatsSlice";

type ChatsProfileType = {
  userId?: string;
  chat: chatType;
};

function ChatsProfile({ userId, chat }: ChatsProfileType) {
  const [userLoading, setUserLoading] = useState(false);
  const [user, setUser] = useState<userType>(defaultUser);
  const dispatch = useDispatch<AppDispatch>();
  const currentSelectedChat = useSelector(
    (state: RootState) => state.chat.currentSelectedChat
  );
  const {
    id: chatId,
    senderId,
    lastMsg,
    receiverToSenderNewMsgCount,
    senderToReceiverNewMsgCount,
  } = chat;

  useEffect(() => {
    const getUser = async () => {
      if (userId) {
        const usr = await getUserInfo(userId, setUserLoading);
        setUser(usr);
      } else toastError("ChatsProfie");
    };
    getUser();
  }, [userId]);

  const handleSelectedChat = () => {
    dispatch(
      setCurrentSelectedChat({
        ...user,
        chatId,
        receiverToSenderNewMsgCount,
        senderToReceiverNewMsgCount,
      })
    );
  };

  return (
    <UserHeaderProfile
      handleClick={handleSelectedChat}
      user={user}
      otherUser
      loading={userLoading}
      lastMsg={lastMsg}
      newMsgCount={
        iCreatedChat(senderId)
          ? receiverToSenderNewMsgCount
          : senderToReceiverNewMsgCount
      }
      isSelected={userId === currentSelectedChat.id}
    />
  );
}

export default ChatsProfile;
