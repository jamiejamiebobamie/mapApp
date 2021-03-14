import React, { useEffect, useRef } from "react";

import { Map, TileLayer, Marker, Popup, Circle } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import "./MapViewer.css";

import statesData from "./../../mockApi/stateBoundsData";

import L from "leaflet";

export const MapViewer = props => {
  let mapRef = useRef();
  let circles = useRef();

  // initialize the leaflet map only after the "mapid" div has been mounted
  useEffect(() => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;
    let index = 0;
    circles.current = props.Counties.map(({ county, coordinates }) => {
      let long_lat = coordinates[0].split(" ");
      let longitude = parseFloat(long_lat[0], 10);
      let latitude = parseFloat(long_lat[1], 10);
      console.log([latitude, longitude]);
      return (
        <Circle key={index++} center={[longitude, latitude]} radius={200} />
      );
    });
  }, [mapRef, props]);

  const getMapBounds = () => {
    let southWest = mapRef.current.leafletElement.getBounds()._southWest;
    let northEast = mapRef.current.leafletElement.getBounds()._northEast;

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
        _currStates.push(state.name);
      }
    });
    props.addStates(_currStates);
    // props.addPuma(_currStates);
    console.log(props, circles);
  };

  return (
    <>
      <Map
        onClick={() => {
          getMapBounds();
        }}
        style={{}}
        id={"mapid"}
        ref={mapRef}
        center={[39.5, -98.35]}
        zoom={4}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {circles.current}
      </Map>
    </>
  );
};
