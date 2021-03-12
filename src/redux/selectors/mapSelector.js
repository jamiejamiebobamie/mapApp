export const getMapSlice = store => store.map;

export const getPUMAS = store =>
  getMapSlice(store) ? getMapSlice(store).PUMAS : { PUMAS: {} };

export const checkForUS_StateInStore = (store, US_State) =>
  getPUMAS(store).PUMAS[US_State] !== undefined ? true : false;
