import { createSlice } from "@reduxjs/toolkit";
import { taskListType, taskType } from "../Types";
import Tasks from "../Components/Tasks";

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
    collapseTask: (state, action) => {
      const { listId, id } = action.payload;
      const taskList = state.currentTaskList.find((task) => task.id === listId);
      const listIndex = state.currentTaskList.findIndex(
        (task) => task.id === listId
      );

      // collapse and open tasks
      taskList?.tasks?.map((task) => {
        if (task.id === id) {
          task.collapsed = !task.collapsed;
        }
      });

      if (taskList) state.currentTaskList[listIndex] = taskList;
    },
    collapseAllTask: (state, action) => {
      const { listId, value } = action.payload;
      const taskList = state.currentTaskList.find(
        (taskLi) => taskLi.id === listId
      );
      const listIdIndex = state.currentTaskList.findIndex(
        (taskLi) => taskLi.id === listId
      );

      // collapse all and turn off editmode for all tasks
      taskList?.tasks?.map((task) => {
        task.collapsed = value !== undefined ? value : true;
        task.editMode = false;
        return task;
      });

      if (taskList) state.currentTaskList[listIdIndex] = taskList;
    },
    taskSwitchEditMode: (state, action) => {
      const { listId, id, value } = action.payload;
      state.currentTaskList = state.currentTaskList.map((taskLi) => {
        if (taskLi.id === listId) {
          const updatedTask = taskLi.tasks?.map((task) => {
            if (task.id === id) {
              task.editMode = value !== undefined ? value : true;
            }
            return task;
          });
          taskLi.tasks = updatedTask;
        }
        return taskLi;
      });
    },
    saveTask: (state, action) => {
      const { listId, id, title, description } = action.payload;
      const updatedTaskList = state.currentTaskList.map((taskLi) => {
        if (taskLi.id === listId) {
          const updatedTask = taskLi.tasks?.map((task) => {
            if (task.id === id) {
              task = { ...task, title, description, editMode: false };
            }
            return task;
          });
          taskLi.tasks = updatedTask;
        }
        return taskLi;
      });

      state.currentTaskList = updatedTaskList;
    },
    setTaskListTasks: (state, action) => {
      const { listId, tasks } = action.payload;

      const taskList = state.currentTaskList.map((taskLi) => {
        if (taskLi.id === listId) {
          taskLi.tasks = tasks;
        }
        return taskLi;
      });

      state.currentTaskList = taskList;
    },
    deleteTask: (state, action) => {
      const { listId, id } = action.payload;
      const updatedTaskList = state.currentTaskList.map((taskLi) => {
        if (taskLi.id === listId) {
          taskLi.tasks = taskLi.tasks?.filter((task) => task.id !== id);
        }
        return taskLi;
      });
      state.currentTaskList = updatedTaskList;
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
  collapseTask,
  taskSwitchEditMode,
  saveTask,
  setTaskListTasks,
  deleteTask,
  collapseAllTask,
} = taskListSlice.actions;
export default taskListSlice.reducer;
