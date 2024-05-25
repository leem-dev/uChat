import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./Firebase";
import { toastError } from "../utils/toast";
import CatchErr from "../utils/catchErr";
import { authDataType, setLoadingType } from "../Types";

// Sign Up new users
export const BE_signUp = (
  data: authDataType,
  setLoading: setLoadingType,
  reset: () => void
) => {
  const { email, password, confirmPassword } = data;
  // add the spinner till it register the user
  setLoading(true);
  if (email && password) {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          console.log(user);
          // remove spinner when completed
          setLoading(false);
          // refresh the inputs
          reset();
        })
        .catch((err) => {
          CatchErr(err);
          setLoading(false);
        });
    } else toastError("Passwords must match");
  } else toastError("Fields shouldn't be left empty");
};

// Sign in existing users

export const BE_signIn = (
  data: authDataType,
  setLoading: setLoadingType,
  reset: () => void
) => {
  const { email, password } = data;
  // add the spinner while it checks to see if user exists
  setLoading(true);

  signInWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      console.log(user);
      // remove the spinner if spinner exists
      setLoading(false);
      reset();
    })
    .catch((err) => {
      CatchErr(err);
      setLoading(false);
    });
};
