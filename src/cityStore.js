import actionTypes from './actionTypes';
import Store from './store';

//Extend general store and bind actions with store methods.
const CityStore = Store.extend({
    init: function () {
        this.bind(actionTypes.GOT_CITIES, this.set);
        this.bind(actionTypes.ADDED_CITY, this.set);
        this.bind(actionTypes.DELETED_CITY, this.remove);
    }
});

export default CityStore;