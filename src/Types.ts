export type setLoadingType = React.Dispatch<React.SetStateAction<boolean>>;
export type authDataType = {
  email: string;
  password: string;
  confirmPassword?: string;
};

export type userType = {
  id: string;
  img: string;
  isOnline: boolean;
  username: string;
  email: string;
  bio?: string;
  creationTime?: string;
  lastSeen?: string;
};

export type taskType = {
  id?: string;
  title: string;
  description: string;
  editMode?: boolean;
  collapsed?: boolean;
};

export type taskListType = {
  id?: string;
  title: string;
  editMode?: boolean;
  tasks?: taskType[];
};
