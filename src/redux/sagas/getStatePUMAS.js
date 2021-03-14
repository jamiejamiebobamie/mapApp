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

import { actions, addState, addPuma, addCounty } from "../actions";

function* getPUMACoords(county) {
  const response = yield call(fetch, "https://localhost:5002", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ county })
  });
  const data = yield apply(response, response.json);
  console.log(data);

  if (data) {
    yield put({ type: actions.ADD_COUNTY, payload: data });

    // yield put(addCounty, data);
  }
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
    // if (
    //   data.response &&
    //   data.response.length &&
    //   data.response[0] &&
    //   data.response[0].PUMAS &&
    //   data.response[0].PUMAS.length &&
    //   data.response[0].PUMAS[0].Counties &&
    //   data.response[0].PUMAS[0].Counties.length &&
    //   data.response[0].PUMAS[0].Counties[0]
    // ) {
    //   yield data.response.map(us_state_object=>us_state_object.PUMAS.map(Counties=>).Counties[0].map(item =>
    //     spawn(getPUMACoords, data.response[0].PUMAS[0].Counties[0])
    //   );

    // each us state object
    for (let i = 0; i < data.response.length; i++) {
      // each PUMA array in us state object
      for (let j = 0; j < data.response[i].PUMAS.length; j++) {
        // each county in singular PUMA
        for (let k = 0; k < data.response[i].PUMAS[j].Counties.length; k++) {
          const county = data.response[i].PUMAS[j].Counties[k];
          yield spawn(getPUMACoords, county);
        }
      }
    }

    // yield data.response.forEach(us_state_object => {
    //   us_state_object.PUMAS.forEach(PUMA => {
    //     PUMA.Counties.forEach(county => {});
    //   });
    // });
    // yield data.response.forEach(us_state_object => {
    //   us_state_object.PUMAS.forEach(PUMA => {
    //     PUMA.Counties.forEach(county => {
    //       spawn(getPUMACoords, county);
    //     });
    //   });
    // });

    // yield items.map(item=>call(fetchItemPrice,item.id,user.country));
  }
}
