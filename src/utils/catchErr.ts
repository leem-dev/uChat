import { toastError, toastInfo } from "./toast";

const CatchErr = (err: { code?: string }) => {
  const { code } = err;
  if (code === "auth/invalid-email") toastError("Invalid Email");
  else if (code === "auth/weak-password")
    toastError("Password should be at least 6 characters");
  else if (code === "auth/user-not-found") toastError("User not found");
  else if (code === "auth/email-already-in-use")
    toastError("email already exists");
  else if (code === "auth/wrong-password") toastError("Invalid password");
  else if (code === "auth/requires-recent-login")
    toastInfo("logout and login before updating your profile");
  else if (code === "unavailable") toastError("Firebase client is offline");
  else if (code === "'permission-denied'")
    toastError("Firebase client is offline");
  else toastError("An error occurred!");
  console.log(err, err.code);
};

export default CatchErr;
