export function incrementList(city) {
    return {
        type: 'ADD_LIST',
        amount: city,
    }
}

export function removeList(city) {
    return {
        type: 'REMOVE_LIST',
        amount: city,
    }
}

export function activeList(city, param) {
    city.active = param;
    return {
        type: 'ACTIVE_LIST',
        amount: city,
    }
}

export const actions = {
  incrementList,
  removeList,
  activeList,
}
