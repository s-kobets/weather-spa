import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { loadState, saveState } from './localStorage';
import logger from 'redux-logger'

const middleware = applyMiddleware(logger, thunk);
const persistedState = loadState();

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
        console.log('REMOVE_LIST', city.city.id, action.amount.id)
        return city.city.id !== action.amount.id;
      })
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  cities,
  list
});

const cityStore = createStore(rootReducer, persistedState, composeWithDevTools(middleware));

cityStore.subscribe(() => {
  saveState(cityStore.getState());
});

export default cityStore