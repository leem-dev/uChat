import React from "react";

type Props = {};

export function ListLoader({}: Props) {
  return (
    <div className="flex flex-wrap justify-center w-full gap-10">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((l) => (
        <SingleListLoader key={l} />
      ))}
    </div>
  );
}

function SingleListLoader() {
  return (
    <div className="relative w-full max-w-sm bg-gray-200 rounded-md shadow">
      <div className="flex-col animate-pulse">
        <div className="bg-gray-300 h-14 rounded-t-md"></div>
        <div className="flex-1 p-10 space-y-3"></div>
      </div>
      <div className="absolute w-10 h-10 bg-gray-300 rounded-full animate-pulse -bottom-4 -left-4"></div>
    </div>
  );
}

export const TaskListTasksLoader = () => {
  return (
    <div className="flex-1 p-4 pb-10 space-y-3 animate-pulse">
      <div className="h-2 bg-gray-300 rounded"></div>
      <div className="h-2 bg-gray-300 rounded"></div>
      <div className="h-2 bg-gray-300 rounded"></div>
    </div>
  );
};

// loader for left sidebar
export const UsersLoader = () => {
  return (
    <div className="flex flex-col">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
        <UserLoader key={s} />
      ))}
    </div>
  );
};

export const UserLoader = () => {
  return (
    <div className="animate-pulse flex gap-2 items-center px-5 py-3 border-b-[1px] border-gray-200 ">
      <div className="bg-gray-300 rounded-full w-11 h-11"></div>
      <div className="flex flex-col gap-2 w-[70%]">
        <div className="h-3 bg-gray-300 rounded-md"></div>
        <div className="h-3 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
};
