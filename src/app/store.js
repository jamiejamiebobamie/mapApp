import { configureStore } from "@reduxjs/toolkit";
import ToggleSlice from "../features/populationToggler/toggleSlice";
import MapSlice from "../features/MapViewer/mapSlice";

export default configureStore({
  reducer: {
    toggle: ToggleSlice,
    map: MapSlice
  }
});
