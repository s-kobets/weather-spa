import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { loadState, saveState } from './localStorage';
import { createLogger } from 'redux-logger'

const logger = createLogger({
  // ...options
});

const middleware = [ logger, thunk ]
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
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  cities,
  list
});

const cityStore = createStore(rootReducer, persistedState, composeWithDevTools(applyMiddleware(...middleware)));

cityStore.subscribe(() => {
  saveState(cityStore.getState());
});

export default cityStore