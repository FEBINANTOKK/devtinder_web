import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";
import { showToast } from "../utils/toastSlice"; // ⬅ import toast action

const allowedEdit = ["firstName", "photoUrl", "about", "skills", "age"];

const ProfileEdit = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  // Populate form data
  const [formData, setFormData] = useState(() => {
    const temp = {};
    allowedEdit.forEach((field) => {
      temp[field] = user?.[field] || "";
    });
    return temp;
  });

  // Update input fields
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Submit update
  const handleSubmit = async () => {
    try {
      setError("");
      const res = await axios.patch(BASE_URL + "/profile/edit", formData, {
        withCredentials: true,
      });

      dispatch(addUser(res.data.loggedUser));

      // ⬅ Fire Global Toast
      dispatch(showToast("Profile updated successfully!"));
    } catch (err) {
      console.log(err);
      setError("Update Error: " + err.response?.data || err.message);
    }
  };

  return (
    <>
      <div className="max-w-xl mx-auto p-6 bg-base-200 rounded-xl mt-10 shadow">
        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>

        {allowedEdit.map((field) => (
          <div key={field} className="mb-4">
            <label className="label capitalize">{field}</label>

            {field === "about" ? (
              <textarea
                className="textarea textarea-bordered w-full"
                value={formData[field]}
                onChange={(e) => handleChange(field, e.target.value)}
              />
            ) : (
              <input
                type={field === "age" ? "number" : "text"}
                className="input input-bordered w-full"
                value={formData[field]}
                onChange={(e) => handleChange(field, e.target.value)}
              />
            )}
          </div>
        ))}

        <p className="text-red-600">{error}</p>

        <button className="btn btn-primary w-full mt-5" onClick={handleSubmit}>
          Save Changes
        </button>
      </div>

      <div className="mb-32">
        <UserCard user={formData} />
      </div>
    </>
  );
};

export default ProfileEdit;
