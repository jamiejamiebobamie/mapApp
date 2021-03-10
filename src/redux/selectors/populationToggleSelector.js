// import { createSelector } from "reselect";
// export const populationToggleSelector = createSelector(
//   state => state.get(`settings`),
//   settings => settings.highPopulationToggled
// );

export const getSettingsSlice = store => store.settings;

export const populationToggleSelector = store =>
  getSettingsSlice(store)
    ? { highPopulationToggled: getSettingsSlice(store).highPopulationToggled }
    : { highPopulationToggled: true };
