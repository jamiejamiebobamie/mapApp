import * as types from "../actions/actionTypes";
import { initialState } from "./initialState";

export function settingsReducer(state = initialState.settings, action) {
  switch (action.type) {
    case types.TOGGLE_POPULATION_SETTING:
      const newState = {
        ...state,
        highPopulationToggled: !state.settings.highPopulationToggled
      };
      return newState;
    default:
      return state;
  }
}
