import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export function ToggleControl(props) {
  console.log(props);
  // const toggleState = useSelector(selectToggleValue);

  // might be unnecessary to store the state a second time locally...
  // const [highPopulationToggled, togglePopulation] = useState(toggleState);

  const singlePerson = "👤";
  const people = "👥";

  return (
    <div
      className="toggleButton disableSelection"
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        borderRadius: "15px",
        width: "70px",
        height: "70px",
        overflow: "hidden",
        alignSelf: "center",
        borderStyle: "solid",
        borderWidth: "thin",
        textAlign: "center"
      }}
      onClick={() => props.togglePopulationSetting()}
    >
      {!props.highPopulationToggled ? (
        <div className="disableSelection">{singlePerson}</div>
      ) : (
        <div>{people}</div>
      )}
    </div>
  );
}

// export default ToggleControl;
