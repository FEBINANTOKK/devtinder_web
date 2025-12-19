import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearToast } from "../utils/toastSlice";

const Toast = () => {
  const message = useSelector((state) => state.toast.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch(clearToast());
      }, 3000);
    }
  }, [message]);

  if (!message) return null;

  return (
    <div className="toast toast-top toast-center ">
      <div className="alert alert-success">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
