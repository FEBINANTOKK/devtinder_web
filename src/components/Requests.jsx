import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const getRequests = async () => {
    try {
      const requestsData = await axios.get(
        BASE_URL + "/user/request/received",
        {
          withCredentials: true,
        }
      );
      dispatch(addRequests(requestsData.data.connectionRequests));
      console.log(requestsData.data.connectionRequests);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReview = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRequests();
  }, []);
  if (!requests) return;
  if (requests.length == 0)
    return (
      <h2 className="text-3xl font-bold text-shadow-indigo-400 text-center my-7">
        No Requests Found
      </h2>
    );
  return (
    <div>
      <h3 className="text-3xl font-bold text-shadow-indigo-400 text-center my-7">
        Requests
      </h3>
      <div className="flex flex-col max-w-3xl m-auto">
        {requests.map((connection, index) => {
          return (
            <div
              className="my-2 md:my-4  p-4 rounded-2xl bg-base-300 flex justify-center items-center gap-5"
              key={index}
            >
              <div className=" flex gap-4 justify-center items-center">
                <div>
                  <img
                    src={connection.fromUserId.photoUrl}
                    alt=""
                    className="rounded-full min-w-28 min-h-28 w-28 h-28"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-medium pb-2 text-white">
                    {connection.fromUserId.firstName}
                  </h1>
                  <p className="text-gray-300">{connection.fromUserId.about}</p>
                </div>
              </div>
              <div className="flex flex-col  gap-4 justify-center">
                <button
                  className="btn btn-active btn-error"
                  onClick={() => handleReview("rejected", connection._id)}
                >
                  Reject
                </button>
                <button
                  className="btn  btn-active btn-accent"
                  onClick={() => handleReview("accepted", connection._id)}
                >
                  Accept{" "}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
