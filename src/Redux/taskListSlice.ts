import { createSlice } from "@reduxjs/toolkit";
import { taskListType, taskType } from "../Types";

export const defaultTaskList: taskListType = {
  title: "Simple Task List",
};

export const defaultTask: taskType = {
  title: "I'll do this at 9:00am",
  description: "This is what i need to do in order to finish this",
};

type taskListSliceType = {
  currentTaskList: taskListType[];
};

const initialState: taskListSliceType = {
  currentTaskList: [],
};

const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    setTaskList: (state, action) => {
      state.currentTaskList = action.payload;
    },
    addTaskList: (state, action) => {
      const newTaskList = action.payload;
      newTaskList.editMode = true;
      newTaskList.tasks = [];
      state.currentTaskList.unshift(newTaskList);
    },
    saveTaskListTitle: (state, action) => {
      const { id, title } = action.payload;
      state.currentTaskList = state.currentTaskList.map((task) => {
        if (task.id === id) {
          task.title = title;
          task.editMode = false;
        }
        return task;
      });
    },
    taskListSwitchEditMode: (state, action) => {
      const { id, value } = action.payload;
      state.currentTaskList = state.currentTaskList.map((task) => {
        if (task.id === id) {
          task.editMode = value !== undefined ? value : true;
        }
        return task;
      });
    },
    deleteTaskList: (state, action) => {
      const listId = action.payload;
      state.currentTaskList = state.currentTaskList.filter(
        (task) => task.id !== listId
      );
    },
    addTask: (state, action) => {
      const { listId, newTask } = action.payload;

      const updatedList = state.currentTaskList.map((taskList) => {
        if (taskList.id === listId) {
          // switch current task list edit mode to false if its true
          taskList.editMode = false;

          // switch off editMode of all other tasks and collapse them
          const tasks = taskList.tasks?.map((task) => {
            task.editMode = false;
            task.collapsed = true;
            return task;
          });

          // push new task in edit mode
          tasks?.push({ ...newTask, editMode: true, collapsed: false });
          taskList.tasks = tasks;
        }
        return taskList;
      });
      state.currentTaskList = updatedList;
    },
  },
});

export const {
  setTaskList,
  addTaskList,
  saveTaskListTitle,
  taskListSwitchEditMode,
  deleteTaskList,
  addTask,
} = taskListSlice.actions;
export default taskListSlice.reducer;
