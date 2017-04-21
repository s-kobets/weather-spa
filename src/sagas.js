import { call, put, takeLatest } from 'redux-saga/effects'
import { addCity } from './ducks'
import api from './api'

export function* fetchCity(action) {
  const argument = {
    type: 'weather', 
    settings: `?q=${action.amount}`,
  }
  const { response, error } = yield call(api.get, argument)
  if (response) {
      console.log('error', response);
      yield put(addCity(response))
  } else {
      console.log('error', error);
      alert(error);
  }  
}

export function* mySagaCity() {
  yield takeLatest('FETCH_CITY', fetchCity);
}
