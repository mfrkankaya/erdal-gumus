import {
  ADD_PRODUCT_TO_ORDER,
  REMOVE_PRODUCT_FROM_ORDER,
  CATEGORY_CHANGED,
  ADD_PRODUCT_EDIT_ITEM,
  EDIT_ITEM_COLOR_CHANGED,
  EDIT_ITEM_COVER_CHANGED,
  EDIT_ITEM_COVER_UNIT_CHANGED,
  ADD_EDIT_ITEM_COVER,
  CHECK_SEND_AVAILABLE,
  SEND_ORDER,
  SEND_ORDER_FAIL,
  SEND_ORDER_SUCCESS,
  SET_DEFAULT,
  REMOVE_PRODUCT_EDIT_ITEM,
  SEARCHTEXT_CHANGED,
  REMOVE_EDIT_ITEM_COVER
} from './types'
import * as firebase from 'firebase'

export const addProductToOrder = product => dispatch => {
  dispatch({ type: ADD_PRODUCT_TO_ORDER, payload: product })
  setTimeout(() => dispatch({ type: CHECK_SEND_AVAILABLE }), 50)
}

export const removeProductFromOrer = code => dispatch => {
  dispatch({ type: REMOVE_PRODUCT_FROM_ORDER, payload: code })
  setTimeout(() => dispatch({ type: CHECK_SEND_AVAILABLE }), 50)
}

export const categoryChanged = ({ name, value }) => dispatch => {
  dispatch({ type: CATEGORY_CHANGED, payload: { name, value } })
}

export const addProductEditItem = productCode => dispatch => {
  dispatch({ type: ADD_PRODUCT_EDIT_ITEM, payload: productCode })
  setTimeout(() => dispatch({ type: CHECK_SEND_AVAILABLE }), 50)
}

export const removeProductEditItem = ({ productCode, index }) => dispatch => {
  dispatch({ type: REMOVE_PRODUCT_EDIT_ITEM, payload: { productCode, index } })
  setTimeout(() => dispatch({ type: CHECK_SEND_AVAILABLE }), 50)
}

// payload { productCode, index, value }
export const editItemColorChanged = payload => dispatch => {
  dispatch({ type: EDIT_ITEM_COLOR_CHANGED, payload })
  setTimeout(() => dispatch({ type: CHECK_SEND_AVAILABLE }), 50)
}

// payload { productCode, parentIndex, index, value}
export const editItemCoverChanged = payload => dispatch => {
  dispatch({ type: EDIT_ITEM_COVER_CHANGED, payload })
  setTimeout(() => dispatch({ type: CHECK_SEND_AVAILABLE }), 50)
}

// payload { productCode, parentIndex, index}
export const addEditItemCover = payload => dispatch => {
  dispatch({ type: ADD_EDIT_ITEM_COVER, payload })
  setTimeout(() => dispatch({ type: CHECK_SEND_AVAILABLE }), 50)
}

// payload { productCode, parentIndex, index}
export const removeEditItemCover = payload => dispatch => {
  dispatch({ type: REMOVE_EDIT_ITEM_COVER, payload })
  setTimeout(() => dispatch({ type: CHECK_SEND_AVAILABLE }), 50)
}

// payload { productCode, parentIndex, index, value}
export const editItemCoverUnitChanged = payload => dispatch => {
  dispatch({ type: EDIT_ITEM_COVER_UNIT_CHANGED, payload })
  setTimeout(() => dispatch({ type: CHECK_SEND_AVAILABLE }), 50)
}

export const sendOrder = products => dispatch => {
  dispatch({ type: SEND_ORDER })
  const date = new Date().getTime()
  firebase
    .database()
    .ref(`/orders/${date}/`)
    .set({ products, date })
    .then(() => dispatch({ type: SEND_ORDER_SUCCESS }))
    .catch(() => dispatch({ type: SEND_ORDER_FAIL }))
}

export const setDefault = () => dispatch => dispatch({ type: SET_DEFAULT })

export const searchtextChanged = value => dispatch => dispatch({ type: SEARCHTEXT_CHANGED, payload: value })
