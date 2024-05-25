import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { BE_signIn, BE_signUp } from "../Backend/Queries";

const Login = () => {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);

  const handleSignUp = () => {
    const data = { email, password, confirmPassword };
    BE_signUp(data, setSignUpLoading, resetDets);
  };

  const handleSignIn = () => {
    const data = { email, password };
    BE_signIn(data, setSignInLoading, resetDets);
  };

  const resetDets = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="m-6 w-full md:w-[450px]">
      <h1 className="text-white text-center font-bold text-4xl mb-10 md:text-6xl">
        {login ? "Login" : "Register"}
      </h1>
      <div className="flex flex-col gap-3 bg-white w-full p-6 min-h-[150px] rounded-xl drop-shadow-xl">
        <Input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!login && (
          <Input
            name="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        {/* Switch button when necessary */}
        {login ? (
          <>
            <Button
              text="Login"
              onClick={handleSignIn}
              loading={signInLoading}
            />
            <Button onClick={() => setLogin(false)} text="Register" secondary />
          </>
        ) : (
          <>
            <Button
              text="Register"
              onClick={handleSignUp}
              loading={signUpLoading}
            />
            <Button onClick={() => setLogin(true)} text="Login" secondary />
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
