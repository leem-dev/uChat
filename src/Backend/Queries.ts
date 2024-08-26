import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { auth, db } from "./Firebase";
import { toastError, toastSuccess } from "../utils/toast";
import CatchErr from "../utils/catchErr";
import {
  authDataType,
  chatType,
  setLoadingType,
  taskListType,
  taskType,
  userType,
} from "../Types";
import { NavigateFunction } from "react-router-dom";
import {
  addDoc,
  and,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  or,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  defaultUser,
  setAlertProps,
  setUser,
  setUsers,
  userStorageName,
} from "../Redux/userSlice";
import { AppDispatch } from "../Redux/store";
import ConvertTime from "../utils/ConvertTime";
import AvatarGenerator from "../utils/AvatarGenerator";
import {
  addTask,
  addTaskList,
  defaultTask,
  defaultTaskList,
  deleteTask,
  deleteTaskList,
  saveTask,
  saveTaskListTitle,
  setTaskList,
  setTaskListTasks,
} from "../Redux/taskListSlice";
import { setChats } from "../Redux/chatsSlice";

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
  setLoading: setLoadingType,
  deleteAcc?: boolean
) => {
  setLoading(true);
  // logout in firebase
  signOut(auth)
    .then(async () => {
      // set user offline
      if (!deleteAcc) await updateUserInfo({ isOffline: true });

      // set currentSelected user to default user
      dispatch(setUser(defaultUser));

      // remove from local storage
      localStorage.removeItem(userStorageName);

      // route to auth page
      goTo("/auth");

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

// save user profile
export const BE_saveProfile = async (
  dispatch: AppDispatch,
  data: { email: string; username: string; password: string; img: string },
  setLoading: setLoadingType
) => {
  setLoading(true);
  const { email, username, password, img } = data;
  const id = getStorageUser().id;
  console.log(id);

  if (id) {
    // update email if present
    if (email && auth.currentUser) {
      await updateEmail(auth.currentUser, email)
        .then(() => {
          toastSuccess("Email Updated Successfully");
        })
        .catch((err) => {
          CatchErr(err);
        });
    }

    // update password if its present
    if (password && auth.currentUser) {
      await updatePassword(auth.currentUser, password)
        .then(() => {
          toastSuccess("Password Updated Successfully");
        })
        .catch((err) => {
          CatchErr(err);
        });
    }

    // update user collection only if username or img is present
    if (username || img) {
      await updateUserInfo({ username, img });
      toastSuccess("Updated profile successfully!");
    }

    // get user info
    const userInfo = await getUserInfo(id);

    // update user in state or store
    dispatch(setUser(userInfo));
    setLoading(false);
  } else toastError("BE_saveProfile: id not found");
};

// delete user profile
export const BE_deleteProfile = async (
  dispatch: AppDispatch,
  goTo: NavigateFunction,
  setLoading: setLoadingType
) => {
  setLoading(true);

  // get all tasklist
  const userTaskList = await getAllTaskList();

  // loop through user tasklist and delete each
  if (userTaskList.length > 0) {
    userTaskList.forEach(async (taskLi) => {
      if (taskLi.id && taskLi.tasks)
        await BE_deleteTaskList(taskLi.id, taskLi.tasks, dispatch);
    });
  }

  // delete the user info from the collection
  await deleteDoc(doc(db, usersCollection, getStorageUser().id));

  // delete user account
  const user = auth.currentUser;

  console.log("USER TO BE DELETED!", user);

  if (user) {
    deleteUser(user)
      .then(async () => {
        BE_signOut(dispatch, goTo, setLoading, true);

        // window.location.reload();
      })
      .catch((err) => CatchErr(err));
  }
};

// get all users
export const BE_getAllUsers = async (
  dispatch: AppDispatch,
  setLoading: setLoadingType
) => {
  setLoading(true);

  // get all users except the current user signed in, those online ontop
  const q = query(collection(db, usersCollection), orderBy("isOnline", "desc"));
  onSnapshot(q, (usersSnapshot) => {
    let users: userType[] = [];

    usersSnapshot.forEach((user) => {
      const { img, isOnline, username, email, bio, creationTime, lastSeen } =
        user.data();
      users.push({
        id: user.id,
        img,
        isOnline,
        username,
        email,
        bio,
        creationTime: ConvertTime(creationTime.toDate()),
        lastSeen: ConvertTime(lastSeen.toDate()),
      });
    });

    // take out the current user
    const id = getStorageUser().id;
    if (id) {
      dispatch(setUsers(users.filter((u) => u.id !== id)));
    }
    setLoading(false);
  });
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
      ...(isOnline && { isOnline }),
      ...(isOffline && { isOnline: false }),
      ...(img && { img }),
      lastSeen: serverTimestamp(),
    });
  }
};

// -------------------------------for TASK LIST-------------------------

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
  setLoading?: setLoadingType
) => {
  if (setLoading) setLoading(true);

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
    if (setLoading) setLoading(false);
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

// ----------------------------for TASK-------------------------------

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
    dispatch(deleteTask({ listId, id }));
  }
};

// add task
export const BE_addTask = async (
  dispatch: AppDispatch,
  listId: string,
  setLoading: setLoadingType
) => {
  setLoading(true);

  const task = await addDoc(
    collection(db, taskListCollection, listId, tasksCollection),
    {
      ...defaultTask,
    }
  );

  const newTaskSnapShot = await getDoc(doc(db, task.path));
  if (newTaskSnapShot.exists()) {
    const { title, description } = newTaskSnapShot.data();
    const newTask: taskType = {
      id: newTaskSnapShot.id,
      title,
      description,
    };
    // add in store
    dispatch(addTask({ listId, newTask }));
    setLoading(false);
  } else {
    toastError("BE_addTask: No such document");
    setLoading(false);
  }
};

// update and save task
export const BE_saveTask = async (
  dispatch: AppDispatch,
  listId: string,
  data: taskType,
  setLoading: setLoadingType
) => {
  setLoading(true);
  const { id, title, description } = data;
  if (id) {
    const taskRef = doc(db, taskListCollection, listId, tasksCollection, id);
    await updateDoc(taskRef, { title, description });
    const updatedTask = await getDoc(taskRef);
    if (updatedTask.exists()) {
      setLoading(false);
      // dispatch
      const taskData = { id: updatedTask.id, ...updatedTask.data() };
      dispatch(saveTask({ listId, ...taskData }));
    } else toastError("BE_saveTask: updated task not found");
  } else toastError("BE_saveTask: id not found");
};

// get tasks for task list
export const getTasksForTaskList = async (
  dispatch: AppDispatch,
  listId: string,
  setLoading: setLoadingType
) => {
  setLoading(true);

  // get tasks in a single task list
  const taskRef = collection(db, taskListCollection, listId, tasksCollection);
  const tasksSnapshot = await getDocs(taskRef);
  const tasks: taskType[] = [];

  // if the tasks snap shot is not empty
  if (!tasksSnapshot.empty) {
    tasksSnapshot.forEach((task) => {
      const { title, description } = task.data();
      tasks.push({
        id: task.id,
        title,
        description,
        editMode: false,
        collapsed: true,
      });
    });
  }

  dispatch(setTaskListTasks({ listId, tasks }));
  setLoading(false);
};

// -------------------------------for CHATS-------------------------

// start a chat
export const BE_startChat = async (
  dispatch: AppDispatch,
  rId: string,
  rName: string,
  setLoading: setLoadingType
) => {
  const sId = getStorageUser().id;
  setLoading(true);

  // check if chat exists
  const q = query(
    collection(db, chatsCollection),
    or(
      and(where("senderId", "==", sId), where("receiverId", "==", rId)),
      and(where("senderId", "==", rId), where("receiverId", "==", sId))
    )
  );
  const res = await getDocs(q);

  // if you find no chat with this two Ids, then create one
  if (res.empty) {
    const newChat = await addDoc(collection(db, chatsCollection), {
      senderId: sId,
      receiverId: rId,
      updatedAt: serverTimestamp(),
      senderToReceiverNewMsgCount: 0,
      receiverToSenderNewMsgCount: 0,
      lastMsg: "",
    });

    const newChatSnapshot = await getDoc(doc(db, newChat.path));
    if (!newChatSnapshot.exists()) {
      toastError("BE_startChat: No such document");
    }
    setLoading(false);
    dispatch(setAlertProps({ open: false }));
  } else {
    toastError("You already started chatting with" + rName);
    setLoading(false);
    dispatch(setAlertProps({ open: false }));
  }
};

// get users chats
export const BE_getChats = async (dispatch: AppDispatch) => {
  const id = getStorageUser().id;
  const q = query(
    collection(db, chatsCollection),
    or(where("senderId", "==", id), where("receiverId", "==", id)),
    orderBy("updatedAt", "desc")
  );

  onSnapshot(q, (chatSnapshot) => {
    const chats: chatType[] = [];

    chatSnapshot.forEach((chat) => {
      const {
        senderId,
        receiverId,
        lastMsg,
        updatedAt,
        receiverToSenderNewMsgCount,
        senderToReceiverNewMsgCount,
      } = chat.data();

      chats.push({
        id: chat.id,
        senderId,
        receiverId,
        lastMsg,
        updatedAt,
        receiverToSenderNewMsgCount,
        senderToReceiverNewMsgCount,
      });
    });
    dispatch(setChats(chats));
  });
};
