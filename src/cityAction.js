import dispatcher from './dispatcher';
import actionTypes  from './actionTypes';

//Automatically generate Actions according to actionTypes
Object.keys(actionTypes).forEach(function (key) {

    var funcName = key.split('_').map(function (word, i) {
        if (i === 0) return word.toLowerCase();
        return word[0] + word.slice(1).toLowerCase();
    }).join('');

    exports[funcName] = function (data) {
        dispatcher.dispatch({
            actionType: actionTypes[key],
            data: data
        });
    };
});