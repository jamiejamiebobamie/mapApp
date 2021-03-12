import * as actions from "./actionTypes";
export const addStates = state_array => {
  return { type: actions.ADD_STATES, payload: state_array };
};
