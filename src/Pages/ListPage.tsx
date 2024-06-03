import React, { useEffect, useState } from "react";
import SingleTaskList from "../Components/SingleTaskList";
import { BE_getTaskList } from "../Backend/Queries";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";

type Props = {};

function ListPage({}: Props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const taskList = useSelector(
    (state: RootState) => state.taskList.currentTaskList
  );

  useEffect(() => {
    BE_getTaskList(dispatch, setLoading);
  }, [dispatch]);

  return (
    <div className="p-10 ">
      <div className="flex flex-wrap justify-center gap-10">
        {taskList.map((t) => (
          <SingleTaskList singleTaskList={t} />
        ))}
      </div>
    </div>
  );
}

export default ListPage;
