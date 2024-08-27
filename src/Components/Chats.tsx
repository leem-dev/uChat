import React from "react";
import { sersLoader } from "./Loaders";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

function Chats() {
  const chats = useSelector((state: RootState) => state.chat.chats);

  return chats.length === 0 ? (
    <div className="p-10">
      No chats yet for you, choose a user and start chatting
    </div>
  ) : (
    <h1>Chats</h1>
  );
}

export default Chats;
