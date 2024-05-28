import { toast } from "react-toastify";
import { setLoadingType } from "../Types";

export const toastError = (msg: string, setLoading?: setLoadingType) => {
  toast.error(msg);
  if (setLoading) setLoading(false);
};

export const toastSuccess = (msg: string, setLoading?: setLoadingType) => {
  toast.success(msg);
  if (setLoading) setLoading(false);
};

export const toastWarn = (msg: string, setLoading?: setLoadingType) => {
  toast.warn(msg);
  if (setLoading) setLoading(false);
};

export const toastInfo = (msg: string, setLoading?: setLoadingType) => {
  toast.info(msg);
  if (setLoading) setLoading(false);
};
