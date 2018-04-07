import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import reducers from '../reducers'

const persistConfig = {
  key: 'ridhokumparan',
  storage
}

const reducer = persistReducer(persistConfig, reducers)

let store = createStore(reducer, applyMiddleware(thunk))
let persistor = persistStore(store)

module.exports = { store, persistor }
