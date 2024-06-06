import React, { forwardRef, useState } from "react";
import Icon from "./Icon";
import { MdDelete, MdEdit, MdSave } from "react-icons/md";
import { taskType } from "../Types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";
import { collapseTask, taskSwitchEditMode } from "../Redux/taskListSlice";

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
    const dispatch = useDispatch<AppDispatch>();

    const handleSave = () => {
      const taskData: taskType = {
        id,
        title: homeTitle,
        description: homeDescription,
      };
    };

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
            <p
              onClick={() => dispatch(collapseTask({ listId, id }))}
              className="cursor-pointer"
            >
              {title}
            </p>
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
                <Icon
                  onClick={() =>
                    editMode
                      ? handleSave()
                      : dispatch(taskSwitchEditMode({ listId, id }))
                  }
                  IconName={editMode ? MdSave : MdEdit}
                />
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
