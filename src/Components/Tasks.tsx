import React from "react";

import Task from "./Task";

type Props = {};

function Tasks({}: Props) {
  return (
    <div className="p-3 pb-5">
      <Task />
    </div>
  );
}

export default Tasks;
