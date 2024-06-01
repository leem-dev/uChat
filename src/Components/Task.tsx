import React from "react";
import Icon from "./Icon";
import { MdDelete, MdEdit } from "react-icons/md";

type Props = {};

function Task({}: Props) {
  return (
    <div className="bg-white p-2 mb-2 rounded-md drop-shadow-sm hover:drop-shadow-md">
      <div>
        <p className="cursor-pointer">Task title here</p>
      </div>
      <div>
        <hr />
        <div>
          <p>Show some description here</p>
          <div className="flex justify-end">
            <Icon IconName={MdEdit} />
            <Icon IconName={MdDelete} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task;
