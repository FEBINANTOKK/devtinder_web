import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { showToast } from "../utils/toastSlice";

const Login = () => {
  const [emailId, setEmailId] = useState("hulk@gmail.com");
  const [password, setPassword] = useState("Hulk@222");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [isLogging, setIslogging] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log("jjiii");

      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      dispatch(showToast("Login successful!"));
      navigate("/");
    } catch (error) {
      setError(
        error?.response?.data?.message || "Something happened unexpectedly"
      );
    }
  };
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName: FirstName,
          lastName: LastName,
          emailId: emailId,
          password: password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      dispatch(showToast("sign Up successful!"));
      navigate("/profile");
    } catch (error) {
      console.log(error);

      setError(
        error?.response?.data?.message || "Something happened unexpectedly"
      );
    }
  };
  return (
    <div className="flex justify-center my-20">
      <div className="py-10 bg-base-300 px-5 rounded-2xl">
        <fieldset className="fieldset  border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend text-2xl ">
            {isLogging ? "Login" : "Sign up"}
          </legend>
          {!isLogging && (
            <>
              {" "}
              <label className="label">First Name</label>
              <input
                type="text"
                className="input"
                placeholder="First Name"
                value={FirstName}
                onChange={(e) => setFirstName(e.target.value)}
              />{" "}
              <label className="label">Last Name</label>
              <input
                type="text"
                className="input"
                placeholder="Last Name"
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}
          <label className="label">Email : {emailId}</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-red-500">{error}</p>
          <button
            className="btn btn-neutral mt-4 bg-blue-800 rounded-xl"
            onClick={isLogging ? handleLogin : handleSignUp}
          >
            {isLogging ? "Login" : "Sign up"}
          </button>{" "}
          <p
            className="text-gray-400 px-1 py-1"
            onClick={() => setIslogging((value) => !value)}
          >
            {" "}
            {isLogging
              ? "New User !!  Create Account"
              : "Already have Account  !!  Login here"}
          </p>
        </fieldset>
      </div>
    </div>
  );
};

export default Login;
