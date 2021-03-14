import { connect } from "react-redux";
import { MapViewer } from "./MapViewer";

import { addPuma, addStates } from "./../../redux/actions";
// import { test } from "./../../redux/actions";

import { getCounties, getMapSlice } from "./../../redux/selectors";

// the selector getCounties isn't working...
const mapStateToProps = store =>
  getMapSlice(store) ? getMapSlice(store) : store;

// const mapStateToProps = store => (store.Counties ? store.Counties : { store });

const mapDispatchToProps = {
  addPuma,
  addStates
};

export const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapViewer);
