export const getMapSlice = store => store.map;

export const getPUMAS = store =>
  getMapSlice(store) ? { PUMAS: getMapSlice(store).PUMAS } : { PUMAS: [] };
