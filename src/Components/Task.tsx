import React, { forwardRef, useState } from "react";
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
    const [homeTitle, setHomeTitle] = useState(title);
    const [homeDescription, setHomeDescription] = useState(description);

    return (
      <div
        ref={ref}
        className="bg-white p-2 mb-2 rounded-md drop-shadow-sm hover:drop-shadow-md"
      >
        <div>
          {editMode ? (
            <input
              value={homeTitle}
              onChange={(e) => setHomeTitle(e.target.value)}
              className="border-2 px-2 border-myBlue rounded-sm mb-1"
              placeholder="task title"
            />
          ) : (
            <p className="cursor-pointer">{title}</p>
          )}
        </div>
        {!collapsed && (
          <div>
            <hr />
            <div>
              {editMode ? (
                <textarea
                  onChange={(e) => setHomeDescription(e.target.value)}
                  value={homeDescription}
                  placeholder="todo description"
                  className="w-full px-3 border-2 border-myBlue rounded-md mt-2"
                />
              ) : (
                <p className="p-2 text-justify">{description}</p>
              )}

              <div className="flex justify-end">
                <Icon IconName={MdEdit} />
                <Icon IconName={MdDelete} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default Task;
