import React from "react";
import SingleTaskList from "../Components/SingleTaskList";

type Props = {};

function ListPage({}: Props) {
  return (
    <div className="p-10 ">
      <div className="flex flex-wrap justify-center gap-10">
        <SingleTaskList />
        <SingleTaskList />
        <SingleTaskList />
        <SingleTaskList />
        <SingleTaskList />
        <SingleTaskList />
      </div>
    </div>
  );
}

export default ListPage;
