const initialState = {
  listOfItems: []
}

const GET_ITEMS = 'GET_ITEMS'

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        listOfItems: action.getItems
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
        dispatch({ type: GET_ITEMS, listOfItems: result })
      })
  }
}
