import React, { useEffect, useState } from "react";
import SingleTaskList from "../Components/SingleTaskList";
import { BE_getTaskList } from "../Backend/Queries";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";

type Props = {};

function ListPage({}: Props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    BE_getTaskList(dispatch, setLoading);
  }, [dispatch]);

  return (
    <div className="p-10 ">
      <div className="flex flex-wrap justify-center gap-10">
        <SingleTaskList />
        <SingleTaskList />
        <SingleTaskList />
        <SingleTaskList />
        <SingleTaskList />
        <SingleTaskList />
      </div>
    </div>
  );
}

export default ListPage;
