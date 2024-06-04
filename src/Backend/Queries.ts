import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "./Firebase";
import { toastError } from "../utils/toast";
import CatchErr from "../utils/catchErr";
import {
  authDataType,
  setLoadingType,
  taskListType,
  taskType,
  userType,
} from "../Types";
import { NavigateFunction } from "react-router-dom";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { defaultUser, setUser, userStorageName } from "../Redux/userSlice";
import { AppDispatch } from "../Redux/store";
import ConvertTime from "../utils/ConvertTime";
import AvatarGenerator from "../utils/AvatarGenerator";
import {
  addTaskList,
  defaultTaskList,
  deleteTaskList,
  saveTaskListTitle,
  setTaskList,
} from "../Redux/taskListSlice";

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
  goTo: NavigateFunction,
  dispatch: AppDispatch
) => {
  const { email, password, confirmPassword } = data;
  // add the spinner till it register the user
  setLoading(true);
  if (email && password) {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async ({ user }) => {
          // create user avatar with username
          const imgLink = AvatarGenerator(user.email?.split("@")[0]);

          const userInfo = await addUserToCollection(
            user.uid,
            user.email || "",
            user.email?.split("@")[0] || "",
            imgLink
          );

          // set user info in store and localStorage
          dispatch(setUser(userInfo));
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
    } else toastError("Passwords must match", setLoading);
  } else toastError("Fields shouldn't be left empty", setLoading);
};

// Sign in existing users
export const BE_signIn = (
  data: authDataType,
  setLoading: setLoadingType,
  reset: () => void,
  goTo: NavigateFunction,
  dispatch: AppDispatch
) => {
  const { email, password } = data;
  // add the spinner while it checks to see if user exists
  setLoading(true);

  signInWithEmailAndPassword(auth, email, password)
    .then(async ({ user }) => {
      // update the user isOnline to true
      await updateUserInfo({ id: user.uid, isOnline: true });
      // get user information
      const userInfo = await getUserInfo(user.uid);

      // set user in store
      dispatch(setUser(userInfo));

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

// signOut
export const BE_signOut = (
  dispatch: AppDispatch,
  goTo: NavigateFunction,
  setLoading: setLoadingType
) => {
  setLoading(true);
  // logout in firebase
  signOut(auth)
    .then(async () => {
      // route to auth page
      goTo("/auth");

      // set user offline
      await updateUserInfo({ isOffline: true });

      // set currentSelected user to default user
      dispatch(setUser(defaultUser));

      // remove from local storage
      localStorage.removeItem(userStorageName);

      setLoading(false);
    })
    .catch((err) => CatchErr(err));
};

// get user from local storage
export const getStorageUser = () => {
  const user = localStorage.getItem(userStorageName);
  if (user) return JSON.parse(user);
  else return null;
};

// add user to collection
const addUserToCollection = async (
  id: string,
  email: string,
  username: string,
  img: string
) => {
  // create user with userId
  await setDoc(doc(db, usersCollection, id), {
    isOnline: true,
    img,
    username,
    email,
    creationTime: serverTimestamp(),
    lastSeen: serverTimestamp(),
    bio: `Hi my name is ${username}. I hope to build amazing projects with typescripts soon`,
  });
  return getUserInfo(id);
};

// get user information
const getUserInfo = async (id: string): Promise<userType> => {
  const userRef = doc(db, usersCollection, id);
  const user = await getDoc(userRef);

  if (user.exists()) {
    const { img, isOnline, username, email, bio, creationTime, lastSeen } =
      user.data();

    return {
      id: user.id,
      img,
      isOnline,
      username,
      email,
      bio,
      creationTime: creationTime
        ? ConvertTime(creationTime.toDate())
        : "no date yet: userinfo",
      lastSeen: lastSeen
        ? ConvertTime(lastSeen.toDate())
        : "no date yet: userinfo",
    };
  } else {
    toastError(`${getUserInfo}: user not found`);
    return defaultUser;
  }
};

// update user info
const updateUserInfo = async ({
  id,
  username,
  img,
  isOnline,
  isOffline,
}: {
  id?: string;
  username?: string;
  img?: string;
  isOnline?: boolean;
  isOffline?: boolean;
}) => {
  if (!id) {
    id = getStorageUser().id;
  }

  // update user doc
  if (id) {
    await updateDoc(doc(db, usersCollection, id), {
      ...(username && { username }),
      ...(img && { img }),
      ...(isOnline && { isOnline }),
      ...(isOffline && { isOnline: false }),
      lastSeen: serverTimestamp(),
    });
  }
};

// -------------------------------TASK LIST-------------------------

// add a single task list
export const BE_addTaskList = async (
  dispatch: AppDispatch,
  setLoading: setLoadingType
) => {
  setLoading(true);
  const { title } = defaultTaskList;
  const list = await addDoc(collection(db, taskListCollection), {
    title,
    userId: getStorageUser().id,
  });

  const newDocSnap = await getDoc(doc(db, list.path));

  if (newDocSnap.exists()) {
    const newlyAddedDoc: taskListType = {
      id: newDocSnap.id,
      title: newDocSnap.data().title,
    };

    // dispatch addTaskList
    dispatch(addTaskList(newlyAddedDoc));
    setLoading(false);
  } else {
    toastError("BE_addTaskList:No such doc");
    setLoading(false);
  }
};

// get all task list
export const BE_getTaskList = async (
  dispatch: AppDispatch,
  setLoading: setLoadingType
) => {
  setLoading(true);

  // get user task list
  const taskList = await getAllTaskList();

  //  get taskList from firestore
  dispatch(setTaskList(taskList));
  setLoading(false);
};

// save task list title
export const BE_saveTaskList = async (
  dispatch: AppDispatch,
  setLoading: setLoadingType,
  listId: string,
  title: string
) => {
  setLoading(true);
  await updateDoc(doc(db, taskListCollection, listId), { title });

  const updatedTaskList = await getDoc(doc(db, taskListCollection, listId));
  setLoading(false);

  // dispatch to save task list
  dispatch(
    // updatedTaskList.data() will give {title}
    // use spread operator to give only title.
    saveTaskListTitle({ id: updatedTaskList.id, ...updatedTaskList.data() })
  );
};

// delete task list
export const BE_deleteTaskList = async (
  listId: string,
  tasks: taskType[],
  dispatch: AppDispatch,
  setLoading: setLoadingType
) => {
  setLoading(true);

  // looping through tasks and delete
  if (tasks.length > 0) {
    for (let i = 0; i < tasks.length; i++) {
      const { id } = tasks[i];
      if (id) BE_deleteTask(listId, id, dispatch);
    }
  }

  // delete task list board
  const listRef = doc(db, taskListCollection, listId);
  await deleteDoc(listRef);
  const deletedTaskList = await getDoc(listRef);

  if (!deletedTaskList.exists()) {
    setLoading(false);
    // dispatch delete task list and update state
    dispatch(deleteTaskList(listId));
  }
};

// get all user tasklist
const getAllTaskList = async () => {
  const q = query(
    collection(db, taskListCollection),
    where("userId", "==", getStorageUser().id)
  );
  const taskListSnapshot = await getDocs(q);
  const taskList: taskListType[] = [];

  taskListSnapshot.forEach((doc) => {
    const { title } = doc.data();
    taskList.push({
      id: doc.id,
      title,
      editMode: false,
      tasks: [],
    });
  });
  return taskList;
};

// ----------------------------TASK-------------------------

// delete task
export const BE_deleteTask = async (
  listId: string,
  id: string,
  dispatch: AppDispatch,
  setLoading?: setLoadingType
) => {
  if (setLoading) setLoading(true);

  // get the task reference
  const taskRef = doc(db, taskListCollection, listId, tasksCollection, id);
  await deleteDoc(taskRef);

  const deletedTask = await getDoc(taskRef);
  if (!deletedTask.exists()) {
    if (setLoading) setLoading(false);
    // dispatch(deleteTask)
  }
};
