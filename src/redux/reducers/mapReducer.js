import * as types from "../actions/actionTypes";
import { initialState } from "./initialState";

export function mapReducer(state = initialState.map, action) {
  switch (action.type) {
    case types.ADD_PUMA:
      console.log(state);
      if (state.PUMAS && action.payload) {
        return { PUMAS: [...state.PUMAS, action.payload] };
      } else {
        return { PUMAS: [] };
      }
    default:
      return { PUMAS: [] };
  }
}
