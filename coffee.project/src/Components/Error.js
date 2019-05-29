import React from "react";
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <>
      <div>Error 404 - Page does not exist</div>
      <NavLink activeStyle={{ color: "white" }} exact to={`/shop`}>
        go back to shop!
      </NavLink>
    </>
  );
};

export default Error;
