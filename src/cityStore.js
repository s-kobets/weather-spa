import {createStore} from 'redux';

const initialState = { cities: [] };

function reducer(state = { cities: [] }, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { cities: state.cities.concat(action.amount) }
    case 'DECREMENT':
      return { cities: state.cities.filter(city => {
        return city.id !== action.amount.id;
      })}
    default:
      return state;
  }
}

export default createStore(reducer, initialState);