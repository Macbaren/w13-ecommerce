const initialState = {
  listOfItems: [],
  listOfRates: {},
  currency: 'USD',
  sortTypeDirection: {
    type: 'price',
    direction: '0-9'
  }
}

const GET_ITEMS = 'GET_ITEMS'
const GET_RATES = 'GET_RATES'
const SET_CURRENCY = 'SET_CURRENCY'
const SET_SORT_TYPE = 'SET_SORT_TYPE'

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        listOfItems: action.getItems
      }
    case GET_RATES:
      return {
        ...state,
        listOfRates: action.getRates
      }
    case SET_CURRENCY:
      return {
        ...state,
        currency: action.currentCurrency
      }
    case SET_SORT_TYPE:
      return {
        ...state,
        sortTypeDIrection: {
          type: action.sortType,
          direction: action.sortDirection
        }
      }
    default:
      return state
  }
}

export function getItemsFromServer() {
  return (dispatch) => {
    fetch('/api/v1/items')
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: GET_ITEMS, getItems: result })
      })
  }
}

export function getRatesFromServer() {
  return (dispatch) => {
    fetch('/api/v1/rates')
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: GET_RATES, getRates: result })
      })
  }
}

export function setCurrency(currentCurrency) {
  return { type: SET_CURRENCY, currentCurrency }
}

export function sortItems(sortType = 'price', sortDirection = '0-9') {
  return (dispatch) => {
    fetch(`/api/v1/items/${sortType}/${sortDirection}`)
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: GET_ITEMS, getItems: result })
      })
    dispatch({ type: SET_SORT_TYPE, sortType, sortDirection })
  }
}
