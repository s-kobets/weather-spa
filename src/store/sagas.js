import { call, put, takeLatest } from 'redux-saga/effects';
import { addCity, incrementList } from './ducks';
import api from './api';

export function* fetchCity(action) {
  const argument = {
    type: 'weather',
    settings: `?q=${action.amount}`
  };
  const { response, error } = yield call(api.get, argument);
  if (response) {
    yield put(addCity(response));
  } else {
    alert(error.response.message);
  }
}

export function* locationCity(action) {
  const argument = {
    type: 'weather',
    settings: `?lat=${action.amount.lat}&lon=${action.amount.log}`
  };
  const { response, error } = yield call(api.get, argument);
  if (response) {
    yield put(addCity(response));
  } else {
    alert(error.response.message);
  }
}

export function* moreDetailsCity(action) {
  const argument = {
    type: 'forecast',
    settings: `?id=${action.amount}`
  };

  const { response, error } = yield call(api.get, argument);
  if (response) {
    const itemObj = { active: true };
    yield put(incrementList(Object.assign({}, itemObj, response)));
  } else {
    alert(error.response.message);
  }
}

export function* mySagaCity() {
  yield [
    takeLatest('FETCH_CITY', fetchCity),
    takeLatest('MORE_CITY', moreDetailsCity),
    takeLatest('LOAD_CITY', locationCity)
  ];
}
