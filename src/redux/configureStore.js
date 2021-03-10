import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./reducers";
import createSagaMiddleware from "redux-saga";
import { initSagas } from "./initSagas";
import { initialState } from "./reducers";

const configureStore = initialState => {
  const sagaMiddleware = createSagaMiddleware();
  const composables = [applyMiddleware(sagaMiddleware)];
  const enhancer = compose(...composables);
  const store = createStore(rootReducer, initialState, enhancer);
  initSagas(sagaMiddleware);
  return store;
};

export const store = configureStore(initialState);
