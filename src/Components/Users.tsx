import React from "react";
import { UsersLoader } from "./Loaders";

type UsersPropTypes = {
  loading: boolean;
};

function Users({ loading }: UsersPropTypes) {
  return loading ? (
    <UsersLoader />
  ) : Users.length === 0 ? (
    <div className="p-10">
      No user registered apart from you, tell others to register and start
      chatting
    </div>
  ) : (
    <div>{loading ? "LOADING" : "USERS ALREADY HERE"} </div>
  );
}

export default Users;
