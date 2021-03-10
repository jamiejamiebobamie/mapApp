import { connect } from "react-redux";
import { MapViewer } from "./MapViewer";

import { addPuma } from "./../../redux/actions";
// import { test } from "./../../redux/actions";

import { getPUMAS } from "./../../redux/selectors";

const mapStateToProps = store => getPUMAS(store);

const mapDispatchToProps = {
  addPuma
};

export const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapViewer);
