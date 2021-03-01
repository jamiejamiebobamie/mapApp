import React from "react";

import "./Logo.css";

const Logo = props => {
  return (
    <img
      className={props.className ? props.className : "logo"}
      src={props.src ? props.src : "./logos/leafletjs2.png"}
      alt={props.alt ? props.alt : "Technology logo"}
    />
  );
};

export default Logo;
