import React, { useRef } from "react";
import axios from "axios";
function Session(props) {
  const inpu = useRef();
  const http = axios.create({ withCredentials: true });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //    axios.defaults.withCredentials = true;
      const response = await axios.post(
        "http://127.0.0.1:8000/leavetracker/session",
        { project_id: "f5b10d49-9056-4faa-b95a-251f998a724f" },
        { withCredentials: true }
      );
    } catch (er) {}
  };
  const handleClick = async () => {
    try {
      //    axios.defaults.withCredentials = true;
      const response = await axios.get(
        "http://127.0.0.1:8000/leavetracker/session",
        { withCredentials: true }
      );
    } catch (er) {}
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="submit" value="Submit" />
      </form>
      <button onClick={handleClick}>get</button>
    </>
  );
}

export default Session;
