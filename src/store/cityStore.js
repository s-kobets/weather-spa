import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { loadState, saveState } from './localStorage';
import createSagaMiddleware from 'redux-saga'
import { reducer as form } from 'redux-form'

import { mySagaCity } from './sagas'
// создаем saga мидлвар
const sagaMiddleware = createSagaMiddleware();
let middleware;

if (process.env.NODE_ENV !== 'production') {
  const { logger } = require('redux-logger')
  middleware = applyMiddleware(logger, sagaMiddleware);
} else {
  middleware = applyMiddleware(sagaMiddleware);
}
const persistedState = loadState();

function nameCity(state='', action) {
  switch (action.type) {
    case 'FETCH_CITY':
      return action.amount
    case 'MORE_CITY':
      return action.amount
    default:
      return state;
  }
}

function moreDetailsCity(state='', action) {
  switch (action.type) {
    case 'MORE_CITY':
      return action.amount
    default:
      return state;
  }
}

function cities(state = [], action) {
  switch (action.type) {
    case 'ADD_CITY':
      return [...state, action.amount]
    case 'REMOVE_CITY':
      return state.filter(city => {
        return city.id !== action.amount.id;
      })
    default:
      return state;
  }
}

function list(state = [], action) {
  switch (action.type) {
    case 'ADD_LIST':
      return [...state, action.amount]
    case 'REMOVE_LIST':
      return state.filter(city => {
        return city.city.id !== action.amount.id;
      })
    case 'ACTIVE_LIST':
      // console.log('ACTIVE_LIST', action.amount)
      return state.map(city => {
        if (city.id === action.amount.id) {
           city.action = action.amount.action;
        }
        return city;
      })
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  form,
  moreDetailsCity,
  nameCity,
  cities,
  list
});


const cityStore = createStore(rootReducer, persistedState, composeWithDevTools(middleware));

// запускаем сагу
sagaMiddleware.run(mySagaCity)

cityStore.subscribe(() => {
  saveState(cityStore.getState());
});

export default cityStore