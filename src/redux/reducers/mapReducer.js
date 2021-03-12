import { actions } from "../actions";
import { initialState } from "./initialState";

export function mapReducer(state = initialState.map, action) {
  switch (action.type) {
    case actions.ADD_STATE:
      console.log(state, action, "hi");
      if (action.payload) {
        console.log(state);
        return { ...state, [action.payload.State]: action.payload.PUMAS };
      } else return state;
    case actions.ADD_PUMA:
      console.log("hisjasa");
      if (state.PUMAS && action.payload) {
        return { PUMAS: [...state.PUMAS, action.payload] };
      } else {
        return state;
      }
    default:
      return state;
  }
}
