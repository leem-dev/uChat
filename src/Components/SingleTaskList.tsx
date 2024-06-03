import React, { forwardRef } from "react";
import Icon from "./Icon";
import { MdAdd, MdDelete, MdEdit, MdKeyboardArrowDown } from "react-icons/md";
import Tasks from "./Tasks";
import { taskListType } from "../Types";

type SingleTaskListPropTypes = {
  singleTaskList: taskListType;
};

const SingleTaskList = forwardRef(
  (
    { singleTaskList }: SingleTaskListPropTypes,
    ref: React.LegacyRef<HTMLDivElement> | undefined
  ) => {
    const { id, title, editMode, tasks } = singleTaskList;
    return (
      <div ref={ref} className="relative">
        <div className="bg-myTasksBg w-full md:w-[400px] drop-shadow-md rounded-md min-h-[150px] overflow-hidden">
          <div className="flex flex-wrap items-center justify-center md:gap-10 bg-gradient-to-tr from-myBlue to-myPink bg-opacity-70 p-3 text-white text-center">
            <p className="flex-1 text-left text-nowrap md:text-center">
              {title}
            </p>
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
        />
      </div>
    );
  }
);

export default SingleTaskList;
