import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, photoUrl, about, age } = user;

  const dispatch = useDispatch();
  const handleRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(userId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-around mt-20">
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={photoUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName}</h2>
          {about && <p className="text-white">{about + "" + age}</p>}
          {_id && (
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={() => handleRequest("ignored", _id)}
              >
                Ignored
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleRequest("interested", _id)}
              >
                Interested
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
