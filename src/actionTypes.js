function keyMirror(keys) {
    keys = Array.isArray(keys) ? keys : Object.keys(keys);
    let mirror = {};
    keys.forEach(v => mirror[v] = v);
    return mirror;
}

const actionTypes = keyMirror({
    INITIALIZE: null,
    ADD_CITY: null,
    ADDED_CITY: null,
    UPDATE_CITY: null,
    UPDATED_CITY: null,
    DELETE_CITY: null,
    DELETED_CITY: null,
    GOT_CITIES: null
});

export default actionTypes;