import { combineReducers } from 'redux'
import general from './general'
import order from './order'

export default combineReducers({
  general,
  order
})
