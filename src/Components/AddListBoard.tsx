import React, { useState } from "react";
import Button from "./Button";
import Icon from "./Icon";
import { MdAdd } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";
import { BE_addTaskList } from "../Backend/Queries";

const AddListBoard = () => {
  const [addLoading, setAddLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleAddTaskList = () => {
    BE_addTaskList(dispatch, setAddLoading);
  };

  return (
    <>
      <Button
        text="Add New List Board"
        className="hidden md:flex"
        loading={addLoading}
        onClick={handleAddTaskList}
      />
      <Icon
        IconName={MdAdd}
        className="block md:hidden"
        onClick={handleAddTaskList}
        loading={addLoading}
        reduceOpacityOnHover={false}
      />
    </>
  );
};

export default AddListBoard;
