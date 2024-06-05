import React, { forwardRef, useState } from "react";
import Icon from "./Icon";
import {
  MdAdd,
  MdDelete,
  MdEdit,
  MdKeyboardArrowDown,
  MdSave,
} from "react-icons/md";
import Tasks from "./Tasks";
import { taskListType } from "../Types";
import {
  BE_addTask,
  BE_deleteTaskList,
  BE_saveTaskList,
} from "../Backend/Queries";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";
import { taskListSwitchEditMode } from "../Redux/taskListSlice";

type SingleTaskListPropTypes = {
  singleTaskList: taskListType;
};

const SingleTaskList = forwardRef(
  (
    { singleTaskList }: SingleTaskListPropTypes,
    ref: React.LegacyRef<HTMLDivElement> | undefined
  ) => {
    const { id, title, editMode, tasks } = singleTaskList;
    const [taskListTitle, setTaskListTitle] = useState(title);
    const [saveLoading, setSaveLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [addTaskLoading, setAddTaskLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleSaveTaskListTitle = () => {
      if (id) {
        BE_saveTaskList(dispatch, setSaveLoading, id, taskListTitle);
      }
    };

    const checkEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") handleSaveTaskListTitle();
    };

    const handleDelete = () => {
      if (id && tasks) BE_deleteTaskList(id, tasks, dispatch, setDeleteLoading);
    };

    const handleAddTask = () => {
      if (id) BE_addTask(dispatch, id, setAddTaskLoading);
    };

    return (
      <div ref={ref} className="relative">
        <div className="bg-myTasksBg w-full md:w-[400px] drop-shadow-md rounded-md min-h-[150px] overflow-hidden">
          <div className="flex flex-wrap items-center justify-center md:gap-10 bg-gradient-to-tr from-myBlue to-myPink bg-opacity-70 p-3 text-white text-center">
            {editMode ? (
              <input
                value={taskListTitle}
                onKeyDown={(event) => checkEnterKey(event)}
                onChange={(event) => setTaskListTitle(event.target.value)}
                className="flex-1 bg-transparent placeholder-gray-300 px-3 py-1 border-[1px] border-white rounded-md"
                placeholder="Enter task list title"
              />
            ) : (
              <p className="flex-1 text-left text-nowrap md:text-center">
                {title}
              </p>
            )}

            <div>
              <Icon
                IconName={editMode ? MdSave : MdEdit}
                onClick={() =>
                  editMode
                    ? handleSaveTaskListTitle()
                    : dispatch(taskListSwitchEditMode({ id }))
                }
                loading={editMode && saveLoading}
              />
              <Icon
                onClick={handleDelete}
                IconName={MdDelete}
                loading={deleteLoading}
              />
              <Icon IconName={MdKeyboardArrowDown} />
            </div>
          </div>
          {id && <Tasks tasks={tasks || []} listId={id} />}
        </div>
        <Icon
          onClick={handleAddTask}
          IconName={MdAdd}
          className="absolute -top-5 -left-4 p-2 drop-shadow-lg hover:bg-myPink"
          reduceOpacityOnHover={false}
          loading={addTaskLoading}
        />
      </div>
    );
  }
);

export default SingleTaskList;
