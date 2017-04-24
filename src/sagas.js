import { call, put, takeLatest } from 'redux-saga/effects'
import { addCity, incrementList } from './ducks'
import api from './api'

export function* fetchCity(action) {
  const argument = {
    type: 'weather', 
    settings: `?q=${action.amount}`,
  }
  const { response, error } = yield call(api.get, argument)
  if (response) {
      yield put(addCity(response))
  } else {
      console.log('error', error);
      alert(error);
  }  
}

export function* moreDetailsCity(action) {
  const argument = {
    type: 'forecast', 
    settings: `?id=${action.amount}`,
  }

  const { response, error } = yield call(api.get, argument)
  if (response) {
      const itemObj = {active: true};
      yield put(incrementList(Object.assign({}, itemObj, response)))
  } else {
      console.log('error', error);
      alert(error);
  }  
}

export function* mySagaCity() {
  yield takeLatest('FETCH_CITY', fetchCity);
  yield takeLatest('MORE_CITY', moreDetailsCity);
}
