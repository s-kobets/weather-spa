export function fetchAddCity(name) {
  return {
    type: 'FETCH_CITY',
    amount: name
  }
}

export function loadAddCity(coordinates) {
  return {
    type: 'LOAD_CITY',
    amount: coordinates
  }
}

export function moreDetailsCity(name) {
  return {
    type: 'MORE_CITY',
    amount: name
  }
}

export function addCity(city) {
  return {
    type: 'ADD_CITY',
    amount: city,
  }
}

export function removeCity(city) {
  return {
    type: 'REMOVE_CITY',
    amount: city
  }
}

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
  loadAddCity,
  moreDetailsCity,
  fetchAddCity,
  addCity,
  removeCity,
  incrementList,
  removeList,
  activeList,
}
