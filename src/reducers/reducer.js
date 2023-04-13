import { applyMiddleware, combineReducers } from 'redux'
import { authStoreState } from './authStore';
import promise from 'redux-promise-middleware'
import thunk from 'redux-thunk'

const middleware = applyMiddleware(promise, thunk)

export default combineReducers({
    authStoreState,
    middleware
  })
