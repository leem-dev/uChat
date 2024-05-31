import React from "react";
import SingleTaskList from "../Components/SingleTaskList";

type Props = {};

function ListPage({}: Props) {
  return (
    <div className="p-10">
      <SingleTaskList />
    </div>
  );
}

export default ListPage;
