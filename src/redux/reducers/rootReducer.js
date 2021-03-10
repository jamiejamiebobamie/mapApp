import { combineReducers } from "redux";
import { mapReducer } from "./mapReducer";
import { settingsReducer } from "./settingsReducer";

export const rootReducer = combineReducers({
  map: mapReducer,
  settings: settingsReducer
});

export default rootReducer;
