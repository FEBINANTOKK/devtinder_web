import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Fotter from "./Fotter";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import Toast from "./Toast";
const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (user) {
      return;
    }
    try {
      const userData = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(userData.data));
    } catch (error) {
      if (error.status == 401) {
        navigate("/login");
      }
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="h-screen bg-black text-white">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full h-16 z-50">
        <Navbar />
      </div>

      {/* Scrollable Content Area */}
      <main className="pt-16 pb-16 h-full overflow-y-auto">
        <Outlet />
      </main>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 w-full h-16">
        <Fotter />
      </div>

      <Toast />
    </div>
  );
};

export default Body;
