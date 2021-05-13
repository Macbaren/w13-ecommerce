import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'
import items from './items'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    items
  })

export default createRootReducer
