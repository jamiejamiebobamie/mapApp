import * as actions from "./actionTypes";
export const addState = state_PUMA_Object => {
  console.log(actions.ADD_STATE, state_PUMA_Object);
  return { type: actions.ADD_STATE, payload: state_PUMA_Object };
};
