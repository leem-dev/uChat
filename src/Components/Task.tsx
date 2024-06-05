import React, { forwardRef } from "react";
import Icon from "./Icon";
import { MdDelete, MdEdit } from "react-icons/md";
import { taskType } from "../Types";

type TaskType = {
  task: taskType;
  listId: string;
};

const Task = forwardRef(
  (
    { task, listId }: TaskType,
    ref: React.LegacyRef<HTMLDivElement> | undefined
  ) => {
    const { id, title, description, editMode, collapsed } = task;
    return (
      <div
        ref={ref}
        className="bg-white p-2 mb-2 rounded-md drop-shadow-sm hover:drop-shadow-md"
      >
        <div>
          <p className="cursor-pointer">{title}</p>
        </div>
        <div>
          <hr />
          <div>
            <p>{description}</p>
            <div className="flex justify-end">
              <Icon IconName={MdEdit} />
              <Icon IconName={MdDelete} />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Task;
