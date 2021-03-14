import { actions } from "../actions";
import { initialState } from "./initialState";

export function mapReducer(state = initialState.map, action) {
  // console.log(state, action);

  switch (action.type) {
    case actions.ADD_STATE:
      if (action.payload) {
        console.log(state, "heyheyas");
        return { ...state, [action.payload.State]: action.payload.PUMAS };
      } else return state;
    case actions.ADD_PUMA:
      if (state.PUMAS && action.payload) {
        return { PUMAS: [...state.PUMAS, action.payload] };
      } else {
        return state;
      }
    case actions.ADD_COUNTY:
      if (state && action.payload) {
        return { Counties: [...state.Counties, action.payload] };
      } else {
        return state;
      }
    default:
      return state;
  }
}
