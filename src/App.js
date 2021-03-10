import { React, useState, useEffect, useRef } from "react";

// import TechnologiesDisplay from "./features/TechnologiesDisplay/TechnologiesDisplay";
// import ToggleControl from "./features/populationToggler/ToggleControl";
// import MapViewer from "./features/MapViewer/MapViewer";

import { TechnologiesDisplay } from "./features";
import { ToggleContainer } from "./features";
import { MapContainer } from "./features";

import "./App.css";

// TO-DO:
// setup the store to cache the PUMA pop data.

// remove coords from api2 that are outside the state bounding box.
// (also change the order of the coords to be lat and then long....)

// implement redux saga to call api1 and api2 (but only once api1 has returned data.)

function App() {
  return (
    <div className="App">
      <h1 className="divTitle">Population Map</h1>
      <MapContainer />
      <div className="bottomDisplay">
        <TechnologiesDisplay />
        <ToggleContainer />
      </div>
    </div>
  );
}

export default App;
