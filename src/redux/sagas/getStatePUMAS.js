import {
  put,
  take,
  fork,
  actionChannel,
  apply,
  call,
  all,
  spawn,
  takeLatest
} from "redux-saga/effects";

import fetch from "isomorphic-fetch";

import { actions, addState, addPuma } from "../actions";

import { checkForUS_StateInStore } from "../selectors";

export function* getPUMA_Coords(PUMA) {
  console.log(PUMA);
  // while (true) {
  // }
}

export function* getStatePUMAS() {
  const addStateRequest_Buffer = yield actionChannel(actions.ADD_STATES);
  while (true) {
    const action = yield take(addStateRequest_Buffer);
    const response = yield call(fetch, "https://localhost:5001", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ states: action.payload })
    });
    const data = yield apply(response, response.json);
    console.log(data);
    if (data.response) {
      yield data.response.forEach(
        state_PUMA_Object =>
          // put({ type: actions.ADD_STATE, state_PUMA_Object })
          put(addState, state_PUMA_Object)

        // put(addPuma(state_PUMA_Object))
      );
    }

    // US_States.forEach(US_State => {
    //     const hi = yield put(setCurrentUser(US_State));
    //
    // if (!checkForUS_StateInStore(US_State)) {
    // }
    // });
  }
}
//  const
//     while (true){
//
//     }
//   const res = yield fetch("https://localhost:5001", {
//     method: "POST",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     redirect: "follow",
//     referrerPolicy: "no-referrer",
//     body: JSON.stringify({ states: states })
//   });
//
//   const data = await res.json();
//   data.response.forEach(state => {
//     state.PUMAS.forEach(PUMA => {
//       const PUMA_entry = {
//         counties: PUMA.Counties,
//         population: PUMA.Population
//       };
//       let count = 0;
//       PUMA_entry.counties.forEach(county => {
//         let _coords_promise = fetchCoords(county);
//         PUMA_entry.counties[count] = { county, _coords_promise };
//         count++;
//       });
//       props.addPuma(PUMA_entry);
//     });
//   });
//
//
// }
//
// const fetchPUMAS = async states => {
//   const res = await fetch("https://localhost:5001", {
//     method: "POST",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     redirect: "follow",
//     referrerPolicy: "no-referrer",
//     body: JSON.stringify({ states: states })
//   });
//   const data = await res.json();
//   data.response.forEach(state => {
//     state.PUMAS.forEach(PUMA => {
//       const PUMA_entry = {
//         counties: PUMA.Counties,
//         population: PUMA.Population
//       };
//       let count = 0;
//       PUMA_entry.counties.forEach(county => {
//         let _coords_promise = fetchCoords(county);
//         PUMA_entry.counties[count] = { county, _coords_promise };
//         count++;
//       });
//       props.addPuma(PUMA_entry);
//     });
//   });
// };
//
// // test api2
// const fetchCoords = async county => {
//   const res = await fetch("https://localhost:5002", {
//     method: "POST",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     redirect: "follow",
//     referrerPolicy: "no-referrer",
//     body: JSON.stringify({ county })
//   });
//   const coords = await res.json();
//   return coords;
// };
