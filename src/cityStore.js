import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();

function cities(state = { cities: [] }, action) {
  switch (action.type) {
    case 'ADD_CITY':
      return { cities: state.cities.concat(action.amount) }
    case 'REMOVE_CITY':
      return { cities: state.cities.filter(city => {
        return city.id !== action.amount.id;
      })}
    default:
      return state;
  }
}

function list(state = { list: [] }, action) {
  switch (action.type) {
    case 'ADD_LIST':
      return { list: state.list.concat(action.amount) }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  cities,
  list
});

const cityStore = createStore(rootReducer, persistedState, composeWithDevTools(applyMiddleware(thunk)));

cityStore.subscribe(() => {
  saveState(cityStore.getState());
});

export default cityStore