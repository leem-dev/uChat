import React from "react";

type UsersPropTypes = {
  loading: boolean;
};

function Users({ loading }: UsersPropTypes) {
  return <div>{loading ? "LOADING" : "USERS ALREADY HERE"} </div>;
}

export default Users;
