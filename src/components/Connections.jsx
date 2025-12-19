import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSilce";
import { useEffect } from "react";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const getConnections = async () => {
    try {
      var connectionsData = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log("kkkkpoo");

      console.log(connectionsData);

      dispatch(
        addConnections(connectionsData?.data?.data || connectionsData?.data)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);
  if (!connections) return;
  if (connections.length == 0)
    return (
      <h2 className="text-3xl font-bold text-shadow-indigo-400 text-center my-7">
        No Connection Found
      </h2>
    );
  return (
    <div>
      <h3 className="text-3xl font-bold text-shadow-indigo-400 text-center my-7">
        Connections
      </h3>
      <div className="flex flex-col max-w-3xl m-auto">
        {connections.map((connection, index) => {
          return (
            <div
              className="my-2 md:my-4 flex p-4 rounded-2xl bg-base-300 gap-4 justify-center items-center"
              key={index}
            >
              <div>
                <img
                  src={connection.photoUrl}
                  alt=""
                  className="rounded-full min-w-28 min-h-28 w-28 h-28"
                />
              </div>
              <div>
                <h1 className="text-xl font-medium pb-2 text-white">
                  {connection.firstName}
                </h1>
                <p className="text-gray-300">{connection.about}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
