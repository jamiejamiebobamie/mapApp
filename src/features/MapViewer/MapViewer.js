import React, { useState, useEffect, useRef } from "react";

import "./MapViewer.css";

import statesData from "./../../mockApi/stateBoundsData";

import L from "leaflet";

const MapViewer = () => {
  // state variable for storing the current US states that the user is viewing.
  const [currentStates, setCurrentStates] = useState([]);

  const testData1 = { states: ["Wyoming", "Virginia", "Delaware"] };
  const testData2 = {
    counties: ["Arlington County, VA", "Wilmington City, DE"]
  };

  // test api1
  fetch("https://localhost:5001", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ states: currentStates })
  }).then(res => {
    res
      .json()
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  });
  // test api2
  fetch("https://localhost:5002", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(testData2)
  }).then(res => {
    res
      .json()
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  });

  let _map = useRef();

  // initialize the leaflet map only after the "mapid" div has been mounted
  useEffect(() => {
    _map.current = L.map("mapid", {
      zoomControl: false,
      minZoom: 4,
      maxZoom: 10,
      tileSize: 512,
      zoomOffset: -1
    }).setView([34.669418, -87.920766], 7);

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=" +
        "pk.eyJ1IjoiamFtaWVqYW1pZSIsImEiOiJja2xoMDAzZm8yYTBzMnB0a3BmNDVsOGU1In0.a2d8uk_nw6tlJ3d9Hpiqsw",
      {
        id: "mapbox/light-v9",
        tileSize: 512,
        zoomOffset: -1
      }
    ).addTo(_map.current);
  }, []);

  const getMapBounds = () => {
    let southWest = _map.current.getBounds()._southWest;
    let northEast = _map.current.getBounds()._northEast;

    let min = [southWest.lng, southWest.lat];
    let max = [northEast.lng, northEast.lat];

    let mapViewBounds = { min: min, max: max };

    let _currStates = [];
    statesData.forEach(state => {
      // test to see if the state is in the viewing window of the map
      if (
        (state.min[0] > mapViewBounds.min[0]) &
        (state.min[1] > mapViewBounds.min[1]) &
        (state.max[0] < mapViewBounds.max[0]) &
        (state.max[1] < mapViewBounds.max[1])
      ) {
        // TO-DO:
        // ** check store for state data **
        // if not found:
        //    query api1 to get the population data.
        //    for each PUMA and from the response
        //    query api2 for the lat and long of those places
        //    ** cache results of entries in store **

        console.log(state.name);
        _currStates.push(state.name);
      }
    });
    // store the currentStates on the map locally
    setCurrentStates(_currStates);
  };

  return <div onClick={() => getMapBounds()} id="mapid"></div>;
};

export default MapViewer;
