import { toast } from "react-toastify";

export const toastError = (msg: string) => {
  toast.error(msg);
};

export const toastSuccess = (msg: string) => {
  toast.success(msg);
};

export const toastWarn = (msg: string) => {
  toast.warn(msg);
};

export const toastInfo = (msg: string) => {
  toast.info(msg);
};
