import { connect } from "react-redux";
import { ToggleControl } from "./ToggleControl";

import { togglePopulationSetting } from "./../../redux/actions";
// import { test } from "./../../redux/actions";

import { populationToggleSelector } from "./../../redux/selectors";

const mapStateToProps = store => populationToggleSelector(store);

const mapDispatchToProps = {
  togglePopulationSetting
};

export const ToggleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToggleControl);
