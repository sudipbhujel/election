import React from "react";
import { toast } from "react-toastify";

toast.configure();

export const displayMessageAction = (type, message, autoClose = 5000) => {
  const CustomToast = () => <div>{message}</div>;

  const toastSettings = {
    position: "top-center",
    autoClose: autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  if (type == "success") {
    toast.success(CustomToast, toastSettings);
  } else if (type == "error") {
    toast.error(CustomToast, toastSettings);
  } else if (type == "warning") {
    toast.warning(CustomToast, toastSettings);
  } else {
    toast(CustomToast, toastSettings);
  }
};
