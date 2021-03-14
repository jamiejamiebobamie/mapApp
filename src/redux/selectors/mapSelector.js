export const getMapSlice = store => (store.map ? store.map : store);

export const getCounties = store =>
  getMapSlice(store) ? getMapSlice(store).Counties : { Counties: {} };
