import * as actions from "./actionTypes";
export const addPuma = PUMA_entry => {
  return { type: actions.ADD_PUMA, payload: PUMA_entry };
};
