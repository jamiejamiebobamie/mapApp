import React from "react";

import Logo from "./Logo";
import "./TechnologiesDisplay.css";

const TechnologiesDisplay = () => {
  return (
    <div className="BuiltWith">
      <h3 className="divTitle">Built with:</h3>
      <div className="logoContainer">
        <Logo className={"logo spinner"} src={"./logos/reactjs2.png"} />
        <Logo className={"logo spinner"} src={"./logos/logo192.png"} />
        <Logo className={"logo spinner"} src={"./logos/redux_saga.png"} />
        <Logo className={"logo bouncerUp"} src={"./logos/nodejs2.png"} />
        <Logo
          className={"logo moverBackAndForth"}
          src={"./logos/leafletjs2.png"}
        />
        <Logo
          className={"logo moverBackAndForth"}
          src={"./logos/github2.png"}
        />
      </div>
    </div>
  );
};

export default TechnologiesDisplay;
