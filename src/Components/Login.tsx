import React from "react";
import Input from "./Input";
import Button from "./Button";

const Login = () => {
  return (
    <div className="m-6 w-full md:w-[450px]">
      <h1 className="text-white text-center font-bold text-4xl mb-10 md:text-6xl">
        Login
      </h1>
      <div className="flex flex-col gap-3 bg-white w-full p-6 min-h-[150px] rounded-xl drop-shadow-xl">
        <Input name="email" type="email" />
        <Input name="password" type="password" />
        <Input name="Confirm password" type="password" />
        <Button text="Login" loading />
        <Button text="Register" secondary loading />
      </div>
    </div>
  );
};

export default Login;
