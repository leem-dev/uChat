import React from "react";
import Icon from "./Icon";
import { MdAdd, MdDelete, MdEdit, MdKeyboardArrowDown } from "react-icons/md";
import Tasks from "./Tasks";

type Props = {};

function SingleTaskList({}: Props) {
  return (
    <div className="relative">
      <div className="bg-myTasksBg w-full md:w-[400px] drop-shadow-md rounded-md min-h-[150px] overflow-hidden">
        <div className="flex flex-wrap items-center justify-center md:gap-10 bg-gradient-to-tr from-myBlue to-myPink bg-opacity-70 p-3 text-white text-center">
          <p>Tasklist Text Here</p>
          <div>
            <Icon IconName={MdEdit} />
            <Icon IconName={MdDelete} />
            <Icon IconName={MdKeyboardArrowDown} />
          </div>
        </div>
        <Tasks />
      </div>
      <Icon
        IconName={MdAdd}
        className="absolute -top-5 -left-4 p-2 drop-shadow-lg hover:bg-myPink"
        reduceOpacityOnHover={false}
        loading
      />
    </div>
  );
}

export default SingleTaskList;
