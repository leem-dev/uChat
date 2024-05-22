import React from "react";

const LoginPage = () => {
  return (
    <div className="bg-blue-600 h-[100vh] flex items-center justify-center">
      <div className="w-full md:w-[450px]">
        <h1 className="text-white text-center font-bold text-4xl mb-10 md:text-6xl">
          Login
        </h1>
        <div className="flex flex-col gap-3 bg-white w-full p-6 min-h-[150px] rounded-xl drop-shadow-xl">
          <input
            type="text"
            placeholder="Enter name"
            className="flex-1 placeholder-gray-300 bg-transparent px-3 py-1 border-2 border-gray-300 rounded-full"
          />
          <input
            type="text"
            placeholder="Enter name"
            className="flex-1 placeholder-gray-300 bg-transparent px-3 py-1 border-2 border-gray-300 rounded-full"
          />
          <input
            type="text"
            placeholder="Enter name"
            className="flex-1 placeholder-gray-300 bg-transparent px-3 py-1 border-2 border-gray-300 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
