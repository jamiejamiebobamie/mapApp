import { configureStore } from "@reduxjs/toolkit";
import ToggleSlice from "../features/populationToggler/toggleSlice";

export default configureStore({
  reducer: {
    toggle: ToggleSlice
  }
});
