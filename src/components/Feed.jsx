import React, { useEffect } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const feed = useSelector((state) => state.feed);

  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      // if (feed) {
      //   return;
      // }
      const res = await axios.get(BASE_URL + "/user/feed?limit=5", {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data.users));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div>{feed?.users?.length > 0 && <UserCard user={feed.users[0]} />}</div>
  );
};

export default Feed;
