/* global reducer */
import {createStore} from 'redux';

let dispatcher = createStore(reducer);

function reducer(state, action) {
	return state;
}

dispatcher.subscribe(() =>
  console.log(dispatcher.getState())
)

export default dispatcher;