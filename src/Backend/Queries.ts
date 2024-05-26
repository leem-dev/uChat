import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "./Firebase";
import { toastError } from "../utils/toast";
import CatchErr from "../utils/catchErr";
import { authDataType, setLoadingType } from "../Types";
import { NavigateFunction } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

// collection names
const usersCollection = "users";
const tasksCollection = "tasks";
const taskListCollection = "taskList";
const chatsCollection = "chats";
const messagesCollection = "messages";

// Sign Up new users
export const BE_signUp = (
  data: authDataType,
  setLoading: setLoadingType,
  reset: () => void,
  goTo: NavigateFunction
) => {
  const { email, password, confirmPassword } = data;
  // add the spinner till it register the user
  setLoading(true);
  if (email && password) {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          const userInfo = addUserToCollection(
            user.uid,
            user.email || "",
            user.email?.split("@")[0] || "",
            "imgLink"
          );
          // remove spinner when completed
          setLoading(false);
          // refresh the inputs
          reset();
          // sign up the user and return to dashboard
          goTo("/dashboard");
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
  reset: () => void,
  goTo: NavigateFunction
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

      // user signed in successfully
      // return user to dashboard
      goTo("/dashboard");
    })
    .catch((err) => {
      CatchErr(err);
      setLoading(false);
    });
};

const addUserToCollection = async (
  id: string,
  email: string,
  username: string,
  img: string
) => {
  await setDoc(doc(db, usersCollection, id), {
    isOnline: true,
    img,
    username,
    email,
    creationTime: serverTimestamp(),
    lastSeen: serverTimestamp(),
    bio: `Hi my name is ${username}. I hope to build amazing projects with typescripts soon`,
  });
};
