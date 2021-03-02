import { createSlice } from "@reduxjs/toolkit";

// example from npx-create-redux-app
export const mapSlice = createSlice({
  name: "map",
  initialState: {
    PUMAS: [] // PUMA entry: {population: int, counties:[array of strings], coordinates: [[lat and long], [lat and long]]}
  },
  reducers: {
    addPUMA: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state.PUMAS = [...state.PUMAS, action.payload];
      // setTimeout(console.log(state.PUMAS), 1000);
    }
  }
});

export const { addPUMA } = mapSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectPUMAS = state => {
  console.log(state.map.PUMAS);
  return state.map.PUMAS;
};

export default mapSlice.reducer;
