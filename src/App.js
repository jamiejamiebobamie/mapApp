import { React, useState, useEffect, useRef } from "react";

import TechnologiesDisplay from "./features/TechnologiesDisplay/TechnologiesDisplay";
import ToggleControl from "./features/populationToggler/ToggleControl";
import MapViewer from "./features/MapViewer/MapViewer";

import "./App.css";

// TO-DO:
// setup the store to cache the PUMA pop data.

// implement redux saga to call api1 and api2 (but only once api1 has returned data.)

function App() {
  return (
    <div className="App">
      <h1 className="divTitle">Population Map</h1>
      <MapViewer />
      <div className="bottomDisplay">
        <TechnologiesDisplay />
        <ToggleControl />
      </div>
    </div>
  );
}

export default App;
