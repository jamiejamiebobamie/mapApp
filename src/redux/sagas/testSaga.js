import {
  put,
  delay,
  take,
  actionChannel,
  fork,
  spawn
} from "redux-saga/effects";
import { actions, addPuma } from "../actions";

export function* testSaga() {
  const chan = yield actionChannel(actions.ADD_PUMA);
  yield put({ type: actions.ADD_PUMA, payload: { PUMA: "puma" } });
  while (true) {
    const { payload } = yield take(chan);
    // yield delay(3000);
    // const hola = yield put({
    //   type: actions.ADD_PUMA,
    //   payload: { PUMA: "puma" }
    // });
    // console.log("hey", hola);
    // yield spawn(testSaga);
  }
}
