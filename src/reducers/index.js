import { combineReducers } from 'redux'
import artikelReducer from './artikelReducer'

const reducer = combineReducers({
  artikel: artikelReducer
})

export default reducer
