import api from '../api';

export const setCityAdd = (cityName) => dispatch => {
	api.get(`?q=${cityName}`)
	.then(data => {
	    dispatch({type: 'ADD_CITY', amount: data});
	})
	.catch(err => {
	  alert(err.message);
	});
}
