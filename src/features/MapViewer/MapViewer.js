import React, { useState, useEffect, useRef, useStatus } from "react";

import "./MapViewer.css";

import statesData from "./../../mockApi/stateBoundsData";

import L from "leaflet";

import { useSelector, useDispatch } from "react-redux";
import { addPUMA, selectPUMAS } from "./mapSlice";

const MapViewer = () => {
  // state variable for storing the current US states that the user is viewing.
  const [currentStates, setCurrentStates] = useState([]);

  const dispatch = useDispatch();

  const testData1 = { states: ["Wyoming", "Virginia", "Delaware"] };
  const testData2 = {
    counties: ["Arlington County, VA", "Wilmington City, DE"]
  };

  const _PUMAS = useSelector(selectPUMAS);

  const fetchPUMAS = async states => {
    const res = await fetch("https://localhost:5001", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ states: states })
    });
    const data = await res.json();
    data.response.forEach(state => {
      state.PUMAS.forEach(PUMA => {
        const PUMA_entry = {
          counties: PUMA.Counties,
          population: PUMA.Population
        };
        let count = 0;
        PUMA_entry.counties.forEach(county => {
          let _coords_promise = fetchCoords(county);
          PUMA_entry.counties[count] = { county, _coords_promise };
          count++;
        });
        dispatch(addPUMA(PUMA_entry));
      });
    });
  };

  // test api2
  const fetchCoords = async county => {
    const res = await fetch("https://localhost:5002", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ county })
    });
    const coords = await res.json();
    return coords;
  };

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

    // must make each PUMA entry in _PUMAS like this:
    var geojsonFeature = {
      type: "Feature",
      properties: {
        name: "Coors Field",
        amenity: "Baseball Stadium",
        popupContent: "This is where the Rockies play!"
      },
      geometry: {
        type: "Point",
        coordinates: [-104.99404, 39.75621]
      }
    };
    L.geoJson(geojsonFeature).addTo(_map.current);

    function getColor(d) {
      return d > 1000
        ? "#800026"
        : d > 500
        ? "#BD0026"
        : d > 200
        ? "#E31A1C"
        : d > 100
        ? "#FC4E2A"
        : d > 50
        ? "#FD8D3C"
        : d > 20
        ? "#FEB24C"
        : d > 10
        ? "#FED976"
        : "#FFEDA0";
    }

    function style(feature) {
      return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7
      };
    }

    // must make each PUMA entry in _PUMAS like this:
    const statesData = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          id: "01",
          properties: { name: "Alabama", density: 94.65 },
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [-87.359296, 35.00118],
                [-85.606675, 34.984749],
                [-85.431413, 34.124869],
                [-85.184951, 32.859696],
                [-85.069935, 32.580372],
                [-84.960397, 32.421541],
                [-85.004212, 32.322956],
                [-84.889196, 32.262709],
                [-85.058981, 32.13674],
                [-85.053504, 32.01077],
                [-85.141136, 31.840985],
                [-85.042551, 31.539753],
                [-85.113751, 31.27686],
                [-85.004212, 31.003013],
                [-85.497137, 30.997536],
                [-87.600282, 30.997536],
                [-87.633143, 30.86609],
                [-87.408589, 30.674397],
                [-87.446927, 30.510088],
                [-87.37025, 30.427934],
                [-87.518128, 30.280057],
                [-87.655051, 30.247195],
                [-87.90699, 30.411504],
                [-87.934375, 30.657966],
                [-88.011052, 30.685351],
                [-88.10416, 30.499135],
                [-88.137022, 30.318396],
                [-88.394438, 30.367688],
                [-88.471115, 31.895754],
                [-88.241084, 33.796253],
                [-88.098683, 34.891641],
                [-88.202745, 34.995703],
                [-87.359296, 35.00118]
              ]
            ]
          }
        }
      ]
    };
    L.geoJson(statesData.features[0], { style: style }).addTo(_map.current);
    const test = {
      type: "Feature",
      id: "01",
      properties: {
        name: "Purchase Area Development District, KY"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-88.652122, 36.753884],
            [-83.548732, 38.200122]
          ]
        ]
      }
    };
    L.geoJson(test).addTo(_map.current);

    const test2 = {
      type: "Feature",
      id: "02",
      properties: {
        name: "Greene, TN, Carter, TN, Unicoi, TN, and Johnson, TN",
        density: 1.264
      },
      geometry: {
        type: "MultiPolygon",
        coordinates: [
          [[[-82.841227, 36.16941]]],
          [
            [
              [-82.141324, 36.27373],
              [-83.71407, 36.02092],
              [-82.0804, 36.41289]
            ]
          ],
          [
            [
              [-82.500638, 36.077102],
              [-82.325181, 36.224549]
            ]
          ],
          [
            [
              [-81.837796, 36.466919],
              [-84.56243, 35.6723]
            ]
          ]
        ]
      }
    };

    L.geoJson(test2).addTo(_map.current);

    // for each PUMA draw an outline of it on the map.
    // _PUMAS.forEach(PUMA => {
    //   L.geoJson(PUMA).addTo(_map.current);
    // });
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
    fetchPUMAS(_currStates);
  };

  return (
    <>
      <div
        onClick={() => {
          getMapBounds();
        }}
        id="mapid"
      ></div>
    </>
  );
};

export default MapViewer;
