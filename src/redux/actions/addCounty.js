import * as actions from "./actionTypes";
export const addCounty = county => {
  return { type: actions.ADD_COUNTY, payload: county };
};
